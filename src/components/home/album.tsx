import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import GalleryPopup from "./galleryPopup";

const importAll = (r: Record<string, any>) =>
  Object.values(r).map((m: any) => m.default);

// Trộn đều mảng (Fisher–Yates) — thay cho .sort(() => 0.5 - Math.random()) bị lệch
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Album() {
  const [images, setImages] = useState<string[]>([]);
  const [delays, setDelays] = useState<number[]>([]);
  const [columnCount, setColumnCount] = useState<number>(
    typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
      ? 3
      : 2
  );
  const [allImages, setAllImages] = useState<string[]>([]); // ✅ lưu toàn bộ ảnh
  const [ratios, setRatios] = useState<Record<string, number>>({}); // ✅ tỉ lệ w/h để chừa sẵn chiều cao

  // 🧠 Dùng useMemo để đảm bảo chỉ import một lần
  const importedImages = useMemo(
    () =>
      importAll(
        import.meta.glob("/src/assets/images/album/*.{webp,jpg,jpeg,png}", {
          eager: true,
        })
      ),
    []
  );

  // ✅ Phân loại ảnh dọc/ngang (tạm thời cho 6 ảnh preload)
  const classifyImages = async (urls: string[]) => {
    const load = (src: string) =>
      new Promise<{
        src: string;
        orientation: "portrait" | "landscape";
        ratio: number;
      }>((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            src,
            orientation: img.width > img.height ? "landscape" : "portrait",
            ratio: img.width / img.height,
          });
        };
        // Tránh treo Promise nếu 1 ảnh lỗi: trả tỉ lệ mặc định (dọc)
        img.onerror = () =>
          resolve({ src, orientation: "portrait", ratio: 0.75 });
        img.src = src;
      });
    return Promise.all(urls.map(load));
  };

  // ✅ Chọn 6 ảnh (4 portrait + 2 landscape) nhưng CHỈ tải vừa đủ để phân loại,
  // thay vì tải toàn bộ 30 ảnh lúc mount → nhẹ tải lần đầu rõ rệt.
  const randomizePreloadImages = async () => {
    const shuffled = shuffle(importedImages);
    const ratioMap: Record<string, number> = {};
    const portraits: string[] = [];
    const landscapes: string[] = [];

    // Phân loại theo từng lô nhỏ, dừng ngay khi đã đủ 4 dọc + 2 ngang
    const BATCH = 6;
    for (
      let i = 0;
      i < shuffled.length && (portraits.length < 4 || landscapes.length < 2);
      i += BATCH
    ) {
      const classified = await classifyImages(shuffled.slice(i, i + BATCH));
      for (const c of classified) {
        ratioMap[c.src] = c.ratio;
        if (c.orientation === "portrait") portraits.push(c.src);
        else landscapes.push(c.src);
      }
    }

    let finalImages: string[];
    if (portraits.length < 4 || landscapes.length < 2) {
      // fallback: không đủ dọc/ngang → lấy 6 ảnh bất kỳ, đảm bảo có tỉ lệ
      finalImages = shuffled.slice(0, 6);
      const missing = finalImages.filter((s) => !(s in ratioMap));
      if (missing.length) {
        (await classifyImages(missing)).forEach(
          (c) => (ratioMap[c.src] = c.ratio)
        );
      }
    } else {
      const selectedPortraits = portraits.slice(0, 4);
      const selectedLandscapes = landscapes.slice(0, 2);
      // Mỗi group = 2 dọc + 1 ngang, shuffle để vị trí ảnh ngang trong cột là ngẫu nhiên
      const group1 = shuffle([
        selectedPortraits[0],
        selectedPortraits[1],
        selectedLandscapes[0],
      ]);
      const group2 = shuffle([
        selectedPortraits[2],
        selectedPortraits[3],
        selectedLandscapes[1],
      ]);
      finalImages = [...group1, ...group2];
    }

    // Stagger theo cặp (giây) cho hiệu ứng fade-up đều, không trượt ngang
    const delayPattern = [0, 0.12, 0.24, 0, 0.12, 0.24];
    const finalDelays = finalImages.map((_, i) => delayPattern[i] ?? 0);

    setRatios(ratioMap);
    setImages(finalImages);
    setDelays(finalDelays);
  };

  // ✅ Khởi tạo preload 6 ảnh
  useEffect(() => {
    randomizePreloadImages();
  }, []);

  // ✅ Khi preload xong, lazy-load phần còn lại sau khi trang idle
  useEffect(() => {
    if (images.length === 0) return;

    // chỉ tải khi trình duyệt rảnh rỗi (đảm bảo hiệu năng)
    const loadRemaining = () => {
      setTimeout(() => {
        const remaining = importedImages.filter((img) => !images.includes(img));
        remaining.forEach((src) => {
          const img = new Image();
          img.src = src; // tải ngầm
        });
        setAllImages(importedImages);
        console.log(`🖼 Lazy loaded ${remaining.length} extra images.`);
      }, 1000); // đợi 1s sau khi render xong
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(loadRemaining);
    } else {
      loadRemaining();
    }
  }, [images]);

  // ✅ Số cột responsive: 2 cột (mobile) / 3 cột (>=640px), theo dõi thay đổi màn hình
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setColumnCount(mq.matches ? 3 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ✅ Chia ảnh vào các cột theo nhóm LIỀN KỀ (group1 -> cột 1, group2 -> cột 2...)
  // Mỗi nhóm đã gồm 2 ảnh dọc + 1 ảnh ngang nên các cột cân bằng chiều cao,
  // và vị trí cố định theo mảng nên không bị nhảy khi ảnh load.
  const columns = useMemo(() => {
    const cols: { src: string; index: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    if (!images.length) return cols;
    const perCol = Math.ceil(images.length / columnCount);
    images.forEach((src, index) => {
      const colIndex = Math.min(Math.floor(index / perCol), columnCount - 1);
      cols[colIndex].push({ src, index });
    });
    return cols;
  }, [images, columnCount]);

  return (
    <div className="relative w-full mx-auto max-w-[600px] overflow-hidden py-10 px-4 lg:py-16">
      <motion.h3
        className="text-[22px] md:text-[32px] lg:text-[40px] text-[#6fa322] uppercase font-family text-center mb-10 tracking-wider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        Album Hình Cưới
      </motion.h3>

      {/* === 6 ảnh hiển thị trước — cột tường minh, vị trí cố định, không reflow === */}
      <div className="flex gap-3 md:gap-4 items-start">
        {columns.map((col, ci) => (
          <div key={ci} className="flex-1 flex flex-col gap-3 md:gap-4">
            {col.map(({ src, index }) => (
              <motion.div
                key={`${src}-${index}`}
                className="relative overflow-hidden rounded-2xl shadow-md cursor-default group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: delays[index] ?? 0,
                  ease: "easeOut",
                }}
              >
                <img
                  src={src}
                  alt={`Wedding ${index + 1}`}
                  className="w-full h-auto object-cover pointer-events-none select-none"
                  style={{ aspectRatio: ratios[src] || 0.75 }}
                  loading="eager" // preload
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* === Nút xem toàn bộ (hiện popup) === */}
      <GalleryPopup images={allImages.length ? allImages : importedImages} />
    </div>
  );
}

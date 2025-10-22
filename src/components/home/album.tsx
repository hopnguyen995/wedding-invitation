import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryPopup from "./galleryPopup";

const importAll = (r: Record<string, any>) =>
  Object.values(r).map((m: any) => m.default);

const AOS_ANIMATIONS = [
  "fade-up",
  "fade-down",
  "zoom-in",
  "fade-right",
  "fade-left",
  "zoom-in-up",
  "zoom-in-down",
];

export default function Album() {
  const [images, setImages] = useState<string[]>([]);
  const [aosKeys, setAosKeys] = useState<{ aos: string; delay: number }[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]); // ✅ lưu toàn bộ ảnh

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
      new Promise<{ src: string; orientation: "portrait" | "landscape" }>(
        (resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              src,
              orientation: img.width > img.height ? "landscape" : "portrait",
            });
          };
          img.src = src;
        }
      );
    return Promise.all(urls.map(load));
  };

  // ✅ Random 6 ảnh (4 portrait + 2 landscape) để preload
  const randomizePreloadImages = async () => {
    const classified = await classifyImages(importedImages);
    const portraits = classified
      .filter((i) => i.orientation === "portrait")
      .map((i) => i.src);
    const landscapes = classified
      .filter((i) => i.orientation === "landscape")
      .map((i) => i.src);

    let finalImages: string[] = [];
    if (portraits.length < 4 || landscapes.length < 2) {
      // fallback random nếu không đủ
      finalImages = [...importedImages].sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
      const selectedPortraits = portraits.sort(() => 0.5 - Math.random()).slice(0, 4);
      const selectedLandscapes = landscapes.sort(() => 0.5 - Math.random()).slice(0, 2);
      const group1 = [
        selectedPortraits[0],
        selectedPortraits[1],
        selectedLandscapes[0],
      ].sort(() => 0.5 - Math.random());
      const group2 = [
        selectedPortraits[2],
        selectedPortraits[3],
        selectedLandscapes[1],
      ].sort(() => 0.5 - Math.random());
      finalImages = [...group1, ...group2];
    }

    // Animation theo cặp
    const delayPattern = [0, 120, 240, 0, 120, 240];
    const randomAos = finalImages.map((_, i) => ({
      aos: AOS_ANIMATIONS[Math.floor(Math.random() * AOS_ANIMATIONS.length)],
      delay: delayPattern[i],
    }));

    setImages(finalImages);
    setAosKeys(randomAos);
  };

  // ✅ Khởi tạo preload 6 ảnh
  useEffect(() => {
    randomizePreloadImages();
    AOS.init();
    AOS.refresh();
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

  // ✅ Refresh lại animation khi đã có ảnh
  useEffect(() => {
    if (images.length) setTimeout(() => AOS.refreshHard(), 200);
  }, [images]);

  return (
    <div className="relative w-full mx-auto max-w-[600px] overflow-hidden py-10 px-4 lg:py-16">
      <h3
        className="text-[22px] md:text-[32px] lg:text-[40px] text-[#6fa322] uppercase font-family text-center mb-10 tracking-wider"
        data-aos="fade-in"
      >
        Album Hình Cưới
      </h3>

      {/* === 6 ảnh hiển thị trước === */}
      <div className="text-center" data-aos="fade-up">
        <div className="inline-block columns-2 sm:columns-3 gap-3 md:gap-4 space-y-3">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative overflow-hidden rounded-2xl shadow-md transition-all cursor-default break-inside-avoid group will-change-transform mb-3"
              data-aos={aosKeys[index]?.aos}
              data-aos-delay={aosKeys[index]?.delay}
            >
              <img
                src={src}
                alt={`Wedding ${index + 1}`}
                className="w-full h-auto object-cover transform-gpu transition-transform duration-700 pointer-events-none select-none"
                loading="eager" // preload
                decoding="sync"
              />
            </div>
          ))}
        </div>
      </div>

      {/* === Nút xem toàn bộ (hiện popup) === */}
      <GalleryPopup images={allImages.length ? allImages : importedImages} />
    </div>
  );
}

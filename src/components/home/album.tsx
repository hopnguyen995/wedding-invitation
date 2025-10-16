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

  // ✅ Import ảnh chỉ 1 lần
  const allImages = useMemo(
    () =>
      importAll(
        import.meta.glob("/src/assets/images/album/*.{webp,jpg,jpeg,png}", {
          eager: true,
        })
      ),
    []
  );

  // ✅ Phân loại ảnh dọc/ngang
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

  // ✅ Hàm random 6 ảnh (4 dọc + 2 ngang) + animation random + delay theo cặp
  const randomizeImages = async () => {
    const classified = await classifyImages(allImages);

    const portraits = classified
      .filter((i) => i.orientation === "portrait")
      .map((i) => i.src);
    const landscapes = classified
      .filter((i) => i.orientation === "landscape")
      .map((i) => i.src);

    if (portraits.length < 4 || landscapes.length < 2) {
      console.warn("⚠️ Không đủ ảnh portrait/landscape, fallback random.");
      const fallback = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 6);
      const randomAos = fallback.map((_, i) => ({
        aos: AOS_ANIMATIONS[Math.floor(Math.random() * AOS_ANIMATIONS.length)],
        delay: [0, 120, 240, 0, 120, 240][i], // delay theo cặp
      }));
      setImages(fallback);
      setAosKeys(randomAos);
      return;
    }

    // 🔹 Random chọn 4 ảnh dọc + 2 ngang
    const selectedPortraits = portraits.sort(() => 0.5 - Math.random()).slice(0, 4);
    const selectedLandscapes = landscapes.sort(() => 0.5 - Math.random()).slice(0, 2);

    // 🔹 Phân nhóm 3-3 (mỗi nhóm có 1 ảnh ngang)
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

    const finalImages = [...group1, ...group2];

    // 🔹 Random animation và delay theo cặp index
    const delayPattern = [0, 120, 240, 0, 120, 240];
    const randomAos = finalImages.map((_, i) => ({
      aos: AOS_ANIMATIONS[Math.floor(Math.random() * AOS_ANIMATIONS.length)],
      delay: delayPattern[i],
    }));

    setImages(finalImages);
    setAosKeys(randomAos);
  };

  // ✅ Init
  useEffect(() => {
    randomizeImages();
    AOS.init();
    AOS.refresh();
  }, []);

  // ✅ Refresh lại AOS khi có ảnh mới
  useEffect(() => {
    if (images.length) setTimeout(() => AOS.refreshHard(), 100);
  }, [images]);

  return (
    <div className="relative w-full mx-auto max-w-[600px] overflow-hidden py-10 px-4 lg:py-16">
      {/* === Tiêu đề === */}
      <h3
        className="text-[22px] md:text-[32px] lg:text-[40px] text-[#6fa322] uppercase font-family text-center mb-10 tracking-wider"
        data-aos="fade-in"
      >
        Album Hình Cưới
      </h3>

      {/* === Layout ảnh === */}
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
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* === Nút xem thêm === */}
      <GalleryPopup images={allImages} />
    </div>
  );
}

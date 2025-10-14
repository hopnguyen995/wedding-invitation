import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryPopup from "./galleryPopup";

// 🎯 Helper: Tự động import tất cả ảnh trong thư mục album
const importAll = (r: Record<string, any>) =>
  Object.values(r).map((m: any) => m.default);

// 🎯 Danh sách animation nhẹ và đẹp cho hiệu năng cao
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
        import.meta.glob("/src/assets/images/album/*.{jpg,jpeg,png}", {
          eager: true,
        })
      ),
    []
  );

  // ✅ Chọn ngẫu nhiên 6 ảnh và tạo animation random
  const randomizeImages = () => {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    const randomAos = selected.map((_, i) => ({
      aos: AOS_ANIMATIONS[Math.floor(Math.random() * AOS_ANIMATIONS.length)],
      delay: (i % 4) * 120,
    }));
    setImages(selected);
    setAosKeys(randomAos);
  };

  // ✅ Lần đầu mount
  useEffect(() => {
    randomizeImages();
    AOS.init();
    AOS.refresh();
  }, []);

  // ✅ Khi đổi ảnh, refresh lại AOS để kích hoạt animation mới
  useEffect(() => {
    if (images.length) AOS.refresh();
  }, [images]);

  return (
    <div className="relative w-full mx-auto max-w-[600px] overflow-hidden py-10 px-4 lg:py-16">
      {/* === Tiêu đề === */}
      <h3
        className="text-[24px] md:text-[32px] lg:text-[40px] text-[#6fa322] uppercase font-family text-center mb-10 tracking-wider drop-shadow-[1px_1px_2px_rgba(0,0,0,0.25)]"
        data-aos="fade-down"
      >
        Album Hình Cưới
      </h3>

      {/* === Layout ảnh === */}
      <div className="text-center" data-aos="fade-up">
        <div className="inline-block columns-2 sm:columns-3 gap-3 md:gap-4 space-y-3">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all cursor-pointer break-inside-avoid group will-change-transform mb-3"
              data-aos={aosKeys[index]?.aos}
              data-aos-delay={aosKeys[index]?.delay}
            >
              <img
                src={src}
                alt={`Wedding ${index + 1}`}
                className="w-full h-auto object-cover transform-gpu transition-transform duration-700"
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

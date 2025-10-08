import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import anh1 from "../../assets/images/album/anh1.png";
import bgFlower from "../../assets/images/imgSvg/hero-img-left.svg";

export interface IBestRegardsProps {}

export default function BestRegards() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-10 px-4 lg:py-16"
      style={{
        backgroundImage: `url(${bgFlower})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "left center",
      }}
    >
      {/* Overlay trắng mờ để dễ đọc chữ */}
      <div className="absolute inset-0 bg-[#f3f2ea]/80"></div>

      <div
        className="relative text-center text-[#6fa322] py-12 px-4 text-family"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        {/* Save the date (chữ calligraphy) */}
        <p
          className="text-[32px] md:text-[40px] mb-4 font-great-vibes text-[#6fa322]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Save the date
        </p>

        {/* Ngày tháng */}
        <p className="text-2xl md:text-3xl font-bold tracking-widest">
          08.11.2025
        </p>
      </div>

{/* Ảnh cô dâu chú rể */}
<div className="relative flex items-center justify-center pb-8">
  <div
    className="relative z-10 flex flex-col items-center justify-center 
        mx-auto bg-gradient-to-br from-[#6fa322]/90 to-[#8fbf44]/90 
        border border-white/30 backdrop-blur-md
        w-full max-w-[400px] md:max-w-[500px] rounded-lg overflow-hidden"
    data-aos="flip-left"
    data-aos-duration="1500"
  >
    <img
      src={anh1}
      alt="Couple"
      className="w-full h-auto object-contain"
    />
  </div>
</div>
    </div>
  );
}

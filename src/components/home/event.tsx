import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import flower from "../../assets/images/imgSvg/flower-small.svg";
import outro from "../../assets/images/imgSvg/bottom-outro.svg";
import intro from "../../assets/images/imgSvg/c1e8r301-2.svg";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";

export interface IEventProps {
  groom: boolean;
}

export default function Event({ groom }: IEventProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const fullText = `THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC ${groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"
    }`;
  const firstLine = `THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI`;
  const { wrapLevel, fontSize } = useAutoWrapText(
    textRef,
    containerRef,
    fullText,
    firstLine,
    { defaultFont: 14, minFont: 8 }
  );

  return (
    <div className="relative w-full pb-6 px-4 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-[650px] mx-auto text-center text-[#6fa322]"
      >
        <img
          src={intro}
          alt="flower"
          className="w-30 mx-auto mb-10"
          data-aos="zoom-in"
          data-aos-delay="600"
        />

        {/* === Lời mời === */}
        <p
          className="md:text-base uppercase tracking-wider font-medium leading-relaxed"
          style={{ fontSize: `${fontSize}px`, fontWeight: "bold" }}
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          TRÂN TRỌNG KÍNH MỜI
        </p>

        {/* === Text chia dòng hoặc scale === */}
        <p
          ref={textRef}
          className="uppercase tracking-wider font-medium mb-6 leading-relaxed whitespace-pre-line transition-all duration-300"
          style={{ fontSize: `${fontSize}px` }}
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {wrapLevel === 1 ? (
            <>
              THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC{" "}
              {groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"}
            </>
          ) : (
            <>
              THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI<br />
              VÀO LÚC {groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"}
            </>
          )}
        </p>

        {/* === Ngày giờ === */}
        <p
          className="text-sm md:text-sm font-semibold tracking-widest mb-3"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {groom ? "THỨ BẢY" : "THỨ SÁU"}
        </p>

        <div className="flex items-center justify-center space-x-4 mb-2">
          
          <div
            className="text-sm md:text-base font-medium tracking-wider"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            THÁNG 11
          </div>
          <div
            className="text-6xl md:text-7xl font-bold text-[#6fa322] leading-none drop-shadow-sm"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            {groom ? "08" : "07"}
          </div>
          <div
            className="text-sm md:text-base font-medium tracking-wider"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            NĂM 2025
          </div>
          <div
            className="hidden sm:block w-16 border-t border-[#6fa322]"
            data-aos="zoom-in"
            data-aos-delay="600"
          />
        </div>

        <p
          className="text-xs md:text-sm italic text-[#6fa322]/80 mb-2"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {groom
            ? "(Tức ngày 19 tháng 9 năm Ất Tỵ)"
            : "(Tức ngày 18 tháng 9 năm Ất Tỵ)"}
        </p>

        <img
          src={flower}
          alt="flower"
          className="w-20 mx-auto my-4"
          data-aos="zoom-in"
          data-aos-delay="600"
        />

        <h2
          className="text-lg tracking-wide font-semibold uppercase mb-1"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          TẠI {groom ? "TƯ GIA NHÀ TRAI" : "NHÀ HÀNG VIỆT NAM"}
        </h2>

        <p
          className="text-sm md:text-sm text-[#6fa322]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Địa chỉ:{" "}
          {groom
            ? "Xã Hát Môn, Phúc Thọ, Hà Nội"
            : "Số 15 Ngõ 2 Quang Trung, Hà Đông, Hà Nội"}
        </p>

        <button
          className="flex items-center gap-2 mx-auto mt-5 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322]/90 hover:text-white transition"
          data-aos="zoom-in-up"
          data-aos-delay="1000"
          onClick={() =>
            window.open(
              groom
                ? "https://maps.app.goo.gl/EXm9vsPyDJN2GAaR6"
                : "https://maps.app.goo.gl/pFxQmyfuHvHYAoDw8",
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          CHỈ ĐƯỜNG
        </button>

        <img
          src={outro}
          alt="flower"
          className="w-30 mx-auto mt-6"
          data-aos="zoom-in"
          data-aos-delay="600"
        />
      </div>
    </div>
  );
}

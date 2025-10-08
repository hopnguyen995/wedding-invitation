import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import flower from "../../assets/images/imgSvg/flower-small.svg";
import outro from "../../assets/images/imgSvg/bottom-outro.svg";

export interface IEventProps {
  groom: boolean;
}

export default function Event(props: IEventProps) {
  const { groom } = props;

  useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);

  return (
    <div
      className="relative lg:w-[100%] mx-auto p-4 lg:py-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#f3f2ea]/80"></div>
      {/* Nội dung chính */}
      <div
        className="relative text-center text-family text-[#6fa322] py-10 px-4"
      >
        {/* Lời mời */}
        <p className="text-sm md:text-base uppercase tracking-wider font-medium mb-6 leading-relaxed"
        data-aos="fade-up"
        data-aos-duration="1500">
          TRÂN TRỌNG KÍNH MỜI ĐẾN THAM DỰ BỮA TIỆC THÂN MẬT CỦA CHÚNG TÔI VÀO LÚC{" "}
          {groom ? "11 GIỜ 30 PHÚT" : "17 GIỜ 00 PHÚT"}
        </p>

        {/* Ngày trong tuần */}
        <p className="text-sm md:text-base font-semibold tracking-widest mb-3"
        data-aos="fade-up"
        data-aos-duration="1500">
          {groom ? "THỨ SÁU" : "THỨ BẢY"}
        </p>

        {/* Khối tháng - ngày - năm */}
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="hidden sm:block w-16 border-t border-[#6fa322]"  data-aos="zoom-in" data-aos-delay="600"/>

          <div className="text-sm md:text-base font-medium tracking-wider"
          data-aos="fade-right"
          data-aos-duration="1500">
            THÁNG 11
          </div>

          <div className="text-6xl md:text-7xl font-bold text-[#6fa322] mx-2 leading-none drop-shadow-sm"
          data-aos="fade-up"
          data-aos-duration="1500">
            {groom ? "07" : "08"}
          </div>

          <div className="text-sm md:text-base font-medium tracking-wider"
          data-aos="fade-left"
          data-aos-duration="1500">
            NĂM 2025
          </div>

          <div className="hidden sm:block w-16 border-t border-[#6fa322]" data-aos="zoom-in" data-aos-delay="600"/>
        </div>

        {/* Ngày âm lịch */}
        <p className="text-xs md:text-sm italic text-[#6fa322]/80 mb-2"
        data-aos="fade-up"
        data-aos-duration="1500">
          {groom
            ? "(Tức ngày 18 tháng 9 năm Ất Tỵ)"
            : "(Tức ngày 19 tháng 9 năm Ất Tỵ)"}
        </p>

        <img src={flower} alt="flower" className="w-20 mx-auto mb-3" data-aos="zoom-in"
        data-aos-delay="600"/>

        {/* Địa điểm */}
        <h2 className="text-lg tracking-wide font-semibold uppercase mb-1"
        data-aos="fade-up"
        data-aos-duration="1500">
          TẠI {groom ? "NHÀ HÀNG VIỆT NAM" : "XÃ HÁT MÔN"}
        </h2>

        <p className="text-xs md:text-sm text-[#6fa322]"
        data-aos="fade-up"
        data-aos-duration="1500">
          Địa chỉ:{" "}
          {groom
            ? "Số 15 Ngõ 2 Quang Trung, Hà Đông, Hà Nội"
            : "Xã Hát Môn, Phúc Thọ, Hà Nội"}
        </p>

        {/* Nút chỉ đường */}
        <button
          className="flex items-center gap-2 mx-auto mt-5 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322] hover:text-white transition"
          data-aos="zoom-in-up"
          data-aos-delay="1000"
          onClick={() =>
            window.open(
              groom
                ? "https://maps.google.com/?q=Nhà+Hàng+Việt+Nam+Hà+Đông"
                : "https://maps.google.com/?q=Xã+Hát+Môn+Phúc+Thọ+Hà+Nội",
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
      </div>
      <img src={outro} alt="flower" className="w-20 mx-auto mb-3" data-aos="zoom-in"
        data-aos-delay="600"/>
    </div>
  );
}

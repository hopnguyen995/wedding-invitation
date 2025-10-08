import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ring from "../../assets/images/imgSvg/ring.svg";

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
          {groom ? "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 13 GIỜ 00 PHÚT" : "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 15 GIỜ 30 PHÚT"}
        </p>

        {/* Ngày trong tuần */}
        <p className="text-sm md:text-base font-semibold tracking-widest mb-3"
        data-aos="fade-up"
        data-aos-duration="1500">
          THỨ BẢY
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
            08
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
            ? "(Tức ngày 19 tháng 9 năm Ất Tỵ)"
            : "(Tức ngày 19 tháng 9 năm Ất Tỵ)"}
        </p>

        <img src={ring} alt="ring" className="w-20 mx-auto mb-3" data-aos="zoom-in"
        data-aos-delay="600"/>

        <p className="text-xs md:text-sm text-[#6fa322]"
        data-aos="fade-up"
        data-aos-duration="1500">
          Địa chỉ:{" "}
          {groom
            ? "Ngõ 2 Tổ 11 Quang Trung, Hà Đông, Hà Nội"
            : "Xã Hát Môn, Phúc Thọ, Hà Nội"}
        </p>
        </div>
    </div>
  );
}

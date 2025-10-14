import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WeddingBoxItem from "./weddingBoxItem";
import QRcode1 from "../../assets/images/qrCode/qr.jpeg";
import QRcode2 from "../../assets/images/qrCode/qr.jpeg";

export interface IWeddingBoxProps {
  groom: boolean;
}

export default function WeddingBox({ groom }: IWeddingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Click ra ngoài để đóng popup
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  // 🎯 MÀU SẮC ĐÃ CẬP NHẬT:
  const RIBBON_COLOR = 'bg-white';
  const BUTTON_COLOR = 'bg-[#6fa322]';

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center items-center py-10 px-4 lg:py-16"
    >
      {/* Overlay trắng nhẹ để nổi chữ */}
      <div className="absolute inset-0 bg-[#f3f2ea]/80 backdrop-blur-[1px]"></div>
      {/* 🎯 BẮT ĐẦU HỘP QUÀ (Màu Xanh Đậm) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center 
                mx-auto bg-gradient-to-br from-[#6fa322]/90 to-[#8fbf44]/90 
                text-white text-family rounded-3xl shadow-2xl
                border border-white/30 backdrop-blur-md
                w-full max-w-[400px] md:max-w-[550px] p-6 lg:p-8
            `}
        data-aos="zoom-in"
      >
        {/* Ruy băng dọc (Trắng) */}
        <div className={`absolute inset-y-0 w-8 ${RIBBON_COLOR} left-1/2 transform -translate-x-1/2 shadow-md z-0`}></div>

        {/* Ruy băng ngang (Trắng) */}
        <div className={`absolute inset-x-0 h-8 ${RIBBON_COLOR} top-1/2 transform -translate-y-1/2 shadow-md z-0`}></div>

        {/* 🎯 Nút gửi mừng (Màu Xanh Lá - Điểm nhấn) */}
        <button
          onClick={() => setIsOpen(true)}
          className={`
                    relative z-10 
                    mx-auto mt-0 
                    ${BUTTON_COLOR} text-white font-bold text-lg 
                    border-4 border-white/80 rounded-full 
                    px-8 py-4 w-40 h-40 flex items-center justify-center text-center
                    shadow-xl 
                    hover:scale-[1.02] 
                    transition duration-300 transform
                `}
        >
          GỬI MỪNG CƯỚI
        </button>
      </div>
      {/* KẾT THÚC HỘP QUÀ */}


      {/* Popup overlay */}
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          {/* Khung popup */}
          <div className="relative bg-transparent animate-fadeIn">
            {/* Nút đóng */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-6 -right-4 text-white text-2xl font-bold hover:text-gray-300"
            >
              ✕
            </button>

            {/* Nội dung WeddingBoxItem */}
            <WeddingBoxItem QRCode={groom ? QRcode2 : QRcode1} groom={groom} />
          </div>
        </div>
      )}
    </div>
  );
}
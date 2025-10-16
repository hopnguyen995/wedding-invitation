import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WeddingBoxItem from "./weddingBoxItem";
import giftbox from "../../assets/images/imgSvg/giftbox.svg";
import QRcode1 from "../../assets/images/qrCode/qr_1.webp";
import QRcode2 from "../../assets/images/qrCode/qr_2.webp";

export interface IWeddingBoxProps {
  groom: boolean;
}

export default function WeddingBox({ groom }: IWeddingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // Click ra ngoài để đóng popup
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col justify-center items-center pt-4"
    >

      {/* Nội dung chính */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        data-aos="fade-up"
      >
        {/* Ảnh giftbox */}
        <img
          src={giftbox}
          alt="giftbox"
          className="w-28 md:w-32 mx-auto mb-1"
          data-aos="zoom-in"
          data-aos-delay="400"
        />

        {/* Nút gửi mừng */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 mx-auto mt-2 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322]/90 hover:text-white transition duration-300 shadow-md"
        >
          GỬI MỪNG CƯỚI
        </button>
      </div>

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
            <WeddingBoxItem QRCode={groom ? QRcode1 : QRcode2} groom={groom} />
          </div>
        </div>
      )}
    </div>
  );
}

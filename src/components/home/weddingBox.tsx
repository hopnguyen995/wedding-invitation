import { useEffect, useState } from "react";
import Reveal from "../reveal";
import WeddingBoxItem from "./weddingBoxItem";
import giftbox from "../../assets/images/imgSvg/giftbox.svg";
import QRcode1 from "../../assets/images/qrCode/qr_1.webp";
import QRcode2 from "../../assets/images/qrCode/qr_2.webp";

export interface IWeddingBoxProps {
  groom: boolean;
}

export default function WeddingBox({ groom }: IWeddingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Click ra ngoài để đóng popup
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  useEffect(() => {
    let scrollY = 0;

    if (isOpen) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const y = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(y || "0") * -1);
    }
  }, [isOpen]);

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col justify-center items-center pt-4"
    >

      {/* Nội dung chính */}
      <Reveal
        anim="fade-up"
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        {/* Ảnh giftbox */}
        <Reveal
          as="img"
          anim="zoom-in"
          delay={0.4}
          src={giftbox}
          alt="giftbox"
          className="w-28 md:w-32 mx-auto mb-1"
        />

        {/* Nút gửi mừng */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex shadow-xl items-center gap-2 mx-auto mt-2 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322]/90 hover:text-white transition duration-300"
        >
          GỬI MỪNG CƯỚI
        </button>
      </Reveal>

      {/* Popup overlay */}
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          {/* Khung popup */}
          <Reveal as="div" anim="zoom-in" className="relative bg-transparent">
            {/* Nút đóng */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-6 -right-4 text-white text-2xl font-bold hover:text-gray-300"
            >
              ✕
            </button>

            {/* Nội dung WeddingBoxItem */}
            <WeddingBoxItem QRCode={groom ? QRcode1 : QRcode2} groom={groom} />
          </Reveal>
        </div>
      )}
    </div>
  );
}

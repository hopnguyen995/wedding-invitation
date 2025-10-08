import WeddingBoxItem from "./weddingBoxItem";
import QRcode1 from "../../assets/images/qrCode/qr.jpeg";
import QRcode2 from "../../assets/images/qrCode/qr.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export interface IWeddingBoxProps {groom: boolean;}

export default function WeddingBox(props: IWeddingBoxProps) {
  const { groom } = props;
  useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
  return (
    <div
      className="relative w-full overflow-hidden py-10 px-4 lg:py-16 text-center">
      <div className="absolute inset-0 bg-[#f3f2ea]/80 backdrop-blur-[1px]"></div>
      <h3 className="text-[24px] md:text-[30px] lg:text-[40px] inline-block text-family text-[#6fa322] uppercase"
      data-aos={ "fade-up"}
      data-aos-duration="1500">
        hộp mừng cưới
      </h3>
      <div className="py-10 px-4 max-w-[500px] mx-auto" 
      data-aos={ "fade-up"}
      data-aos-duration="1500">
        <WeddingBoxItem QRCode={groom ? QRcode1 : QRcode2} groom={groom} />
      </div>
    </div>
  );
}

import WeddingBoxItem from "./weddingBoxItem";
import QRcode1 from "../../assets/images/qrCode/QR.jpg";

export interface IWeddingBoxProps {}

export default function WeddingBox() {
  return (
    <div className="my-8 text-center">
      <h3 className="capitalize text-great-vibes text-[24px] md:text-[30px] lg:text-[40px] inline-block bg-[#feebec] text-[#848383] px-3 border-t-[2px] border-b-[2px] border-[#f23b431a]">
        hộp mừng cưới
      </h3>
      <div className="py-10 px-4 max-w-[500px] mx-auto">
        <WeddingBoxItem QRCode={QRcode1} groom={true} />
      </div>
    </div>
  );
}

export interface IWeddingBoxItemProps {
  QRCode: string;
  groom: boolean;
}

export default function weddingBoxItem({ QRCode, groom }: IWeddingBoxItemProps) {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center 
      mx-auto bg-gradient-to-br from-[#6fa322]/90 to-[#8fbf44]/90 
      text-white text-family rounded-3xl shadow-xl
      border border-white/30 backdrop-blur-md
      w-full max-w-[380px] md:max-w-[460px] p-6"
    >
      <div className="w-full border-solid border-[1px] border-[#f5efed] rounded-3xl shadow-xl h-full mx-auto">
        <div className="text-center">
          <h3 className="text-[16px] md:text-[18px] pt-4 pb-2 font-medium">
            Mừng cưới đến cô dâu và chú rể
          </h3>
          <p className="pb-3 px-2 text-[12px] md:text-[14px] italic">
            *Của chồng công vợ - Tuy hai mà một, tuy một mà hai*
          </p>

          <div className="w-full">
            <img
              src={QRCode}
              className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] mx-auto rounded-md shadow-md"
              alt="QR Code"
            />
          </div>

          <div className="mt-6 mb-6 relative text-[12px] md:text-[14px] leading-relaxed font-semibold">
            <p>Tài khoản: {groom ? "Nguyễn Thế Hợp" : "Nguyễn Mai Anh"}</p>
            <p>Ngân hàng: {groom ? "MB Bank" : "TP Bank"}</p>
            <p>Số tài khoản: {groom ? "0900723838888" : "0326262659"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface IWeddingBoxItemProps {
  QRCode: string;
  groom: boolean;
}

export default function WeddingBoxItem(props: IWeddingBoxItemProps) {
  const { QRCode, groom } = props;
  return (
    <div className="relative z-10 flex flex-col items-center justify-center 
        mx-auto bg-gradient-to-br from-[#6fa322]/90 to-[#8fbf44]/90 
        text-white text-family rounded-3xl shadow-xl
        border border-white/30 backdrop-blur-md
        w-full max-w-[400px] md:max-w-[500px] p-6">
      <div className="w-full border-solid border-[1px] border-[#f5efed] rounded-3xl shadow-xl h-full mx-auto">
        <div className="text-center">
          <h3 className="text-family text-[16px] md:text-[20px] pt-4 pb-2">
            Mừng cưới đến cô dâu và chú rể
          </h3>
          <p className="text-family pb-3 px-2 text-[14px]">
            *Của chồng công vợ - Tuy hai mà một, tuy một mà hai*
          </p>
          <div className="w-full">
            <img
              src={QRCode}
              className="w-[200px] h-[200px] mx-auto" alt="QR Code"
            />
          </div>
          <div className="text-content-item mt-6 mb-10 relative">
            <p className="text-family text-[12px] md:text-[16px] mb-2 font-semibold">
              Tài khoản: {groom ? "Nguyễn Mai Anh" : "Nguyễn Thế Hợp"}
            </p>
            <p className="text-family text-[12px] md:text-[16px] mb-2 font-semibold">
              Ngân hàng: {groom ? "TP Bank" : "MB Bank"}
            </p>
            <p className="text-family text-[12px] md:text-[16px] mb-2 font-semibold">
              Số tài khoản: {groom ? "0326262659" : "0900723838888"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

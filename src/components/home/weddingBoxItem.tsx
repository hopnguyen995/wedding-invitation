export interface IWeddingBoxItemProps {
  QRCode: string;
  groom: boolean;
}

export default function WeddingBoxItem(props: IWeddingBoxItemProps) {
  const { QRCode, groom } = props;
  return (
    <div className="wedding-box-item-wrapper bg-[#df4758] text-[#fff] w-full rounded-md p-4 min-h-[450px]">
      <div className="border-solid border-[1px] border-[#fff] h-full">
        <div className="text-center">
          <h3 className="text-married font-bold text-[16px] md:text-[20px] pt-4 pb-2">
            Mừng cưới đến cô dâu và chú rể
          </h3>
          <p className="text-married font-semibold pb-3 px-2">
            *Của chồng công vợ - Tuy hai mà một, tuy một mà hai*
          </p>
          <div className="w-full">
            <img
              src={QRCode}
              className="w-[200px] h-[200px] mx-auto"
              alt={`QR ${groom ? "groom" : "bride"}`}
            />
          </div>
          <div className="text-content-item mt-6 mb-10 relative">
            <p className="text-married text-[12px] md:text-[16px] mb-2 font-semibold">
              Tài khoản: {groom ? "Vũ Hoàng Hiệp" : ""}
            </p>
            <p className="text-married text-[12px] md:text-[16px] mb-2 font-semibold">
              Ngân hàng: {groom ? "Techcombank" : ""}
            </p>
            <p className="text-married text-[12px] md:text-[16px] mb-2 font-semibold">
              Số tài khoản: {groom ? "1903 8620 5540 12" : ""}
            </p>
          </div>
          <div className="decor-bottom-item my-5"></div>
        </div>
      </div>
    </div>
  );
}

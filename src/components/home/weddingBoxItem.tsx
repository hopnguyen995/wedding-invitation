export interface IWeddingBoxItemProps {
  QRCode: string;
  groom: boolean;
}

export default function WeddingBoxItem(props: IWeddingBoxItemProps) {
  const { QRCode, groom } = props;
  return (
    <div className="wedding-box-item-wrapper bg-[#df4758] text-[#fff] w-full rounded-md p-4 min-h-[420px]">
      <div className="border-solid border-[1px] border-[#fff] h-full">
        <div className="text-center">
          <h3 className="text-married font-bold text-[16px] md:text-[20px] py-3">
            Mừng cưới đến {groom ? "chú rể" : "cô dâu"}
          </h3>
          <div className="w-full">
            <img
              src={QRCode}
              className="w-[150px] h-[150px] mx-auto"
              alt={`QR ${groom ? "groom" : "bride"}`}
            />
          </div>
          {/* <div className="text-content-item mt-6 mb-10 relative">
              <p className="text-married text-[12px] md:text-[16px] mb-2">
                Ngân hàng: {groom ? "Techcombank" : "Vietcombank"}
              </p>
              <p className="text-married text-[12px] md:text-[16px] mb-2">
                Tài khoản: {groom ? "Vũ Hoàng Hiệp" : "Nguyễn Thị Minh Nguyệt"}
              </p>
              <p className="text-married text-[12px] md:text-[16px] mb-2">
                Số tài khoản: {groom ? "0987654321" : "0987654321"}
              </p>
            </div> */}
          <div className="text-content-item mt-6 mb-10 relative">
            <p className="text-married text-[12px] md:text-[16px] mb-2">
              Ngân hàng: {groom ? "Techcombank" : "Vietcombank"}
            </p>
            <p className="text-married text-[12px] md:text-[16px] mb-2">
              Tài khoản: {groom ? "Vũ Hoàng Hiệp" : "Nguyễn Thị Minh Nguyệt"}
            </p>
            <p className="text-married text-[12px] md:text-[16px] mb-2">
              Số tài khoản: {groom ? "0987654321" : "0987654321"}
            </p>
          </div>
          <div className="decor-bottom-item"></div>
        </div>
      </div>
    </div>
  );
}

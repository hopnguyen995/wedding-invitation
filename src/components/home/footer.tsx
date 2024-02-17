export interface IFooterProps {}

export default function Footer() {
  return (
    <div className="footer-wrapper bg-pink-400 flex justify-center items-center h-[150px] py-5">
      <div className="footer-content relative md:before:h-[80px] md:before:w-[90px] md:after:h-[80px] md:after:w-[90px]">
        <p className="text-married font-semibold text-[#fff] text-center text-[20px] md:text-[24px]">
          Hoàng Hiệp
        </p>
        <p className="text-married font-semibold text-[#fff] text-center text-[16px] md:text-[20px]">
          &
        </p>
        <p className="text-married font-semibold text-[#fff] text-center text-[20px] md:text-[24px]">
          Minh Nguyệt
        </p>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export interface IInfoProps {
  urlImg: string;
  groom: boolean;
}

export default function Info(props: IInfoProps) {
  const { urlImg, groom } = props;

  // useEffect(() => {
  //   AOS.init();
  //   // Cài đặt các hiệu ứng AOS tại đây (ví dụ: fade-up)
  //   AOS.refresh(); // Cập nhật AOS khi component được render lại
  // }, []);

  return (
    <div className="info-groom md:flex lg:w-[60%] lg:mx-auto p-4 bg-[#f7faf9]">
      <div
        className={`img-groom md:w-[50%] ${groom ? "order-1" : "order-2"}`}
        // data-aos={groom ? "zoom-in-right" : "zoom-in-left"}
      >
        <img
          className="w-full object-cover rounded-lg border-[2px] border-solid"
          src={urlImg}
          alt={groom ? "groom" : "bride"}
        />
      </div>
      <div
        className={`story md:w-[50%] md:flex-col md:my-auto md:px-3 py-2 ${
          groom ? "order-2" : "order-1"
        }`}
        // data-aos={groom ? "zoom-in-left" : "zoom-in-right"}
      >
        <h2 className="text-[12px] md:text-[16px] font-medium">
          {groom ? "Chú rể: Hoàng Hiệp" : "Cô dâu: Minh Nguyệt"}
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-500 italic py-2">
          {groom
            ? `Là bác sĩ nha khoa hiện đang công tác tại một phòng khám nha khoa ở Quận 1 thành phồ Hồ
          Chí Minh. Là một người hiền lành và ít nói. Luôn coi trọng tình cảm và yêu thương gia
          đình. Với anh: "Gia đình là điểm tựa vững chắc nhất và là bến đỗ bình yên không đâu sánh
          bằng đối với mỗi con người. Đó luôn là nơi tràn ngập tình yêu thương để ta trở về."`
            : `Cô gái đến từ xứ Huế mộng mơ, hiện đang sinh sống và làm việc tại Sài Gòn. Sau khi tốt
          nghiệp Học viện Báo chí và Tuyên truyền, quyết tâm theo đuổi đam mê làm phóng viên du
          lịch. Là một người hay cười nhưng lại sống nội tâm, thích đọc sách, trồng cây và yêu
          thiên nhiên. Ngoài ra còn rất thích vẽ vời, nuôi mèo và nuôi ước mơ có cho mình một vườn
          hồng khoe sắc.`}
        </p>
        <p className="text-great-vibes text-[14px] md:text-[18px] lg:text-[24px]">
          {groom ? "Hoàng Hiệp" : "Minh Nguyệt"}
        </p>
      </div>
    </div>
  );
}

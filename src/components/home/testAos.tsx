import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TestAos = () => {
  useEffect(() => {
    AOS.init();

    // Cài đặt các hiệu ứng AOS tại đây (ví dụ: fade-up)
    AOS.refresh(); // Cập nhật AOS khi component được render lại
  }, []);

  return (
    <div>
      <h2 data-aos="fade-up">
        Hoàng Hiệp{" "}
        <span>
          <i className="fas fa-heart text-[red]"></i>
        </span>{" "}
        Minh Nguyệt
      </h2>
    </div>
  );
};

export default TestAos;

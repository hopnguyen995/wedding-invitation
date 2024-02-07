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
      <h2 data-aos="fade-up">Hello, AOS!</h2>
      <p data-aos="fade-up" data-aos-delay="100">
        Scroll down to see more.
      </p>
    </div>
  );
};

export default TestAos;

import { useRef } from "react";
import { motion } from "framer-motion";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";

export interface IEventProps {
  groom: boolean;
}

export default function thankyou({ groom }: IEventProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
      const textRef = useRef<HTMLParagraphElement | null>(null);
    const fullText = `CẢM ƠN VÌ ĐÃ LÀ MỘT PHẦN TRONG HÀNH TRÌNH NÀY"`;
  const firstLine = `MỘT PHẦN TRONG HÀNH TRÌNH NÀY`;
  const { wrapLevel, fontSize } = useAutoWrapText(
    textRef,
    containerRef,
    fullText,
    firstLine,
    { defaultFont: 18, minFont: 8 }
  );
  return (
    <div className="relative min-h-screen bg-[#f3f2ea] flex items-center justify-center px-4 overflow-hidden">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-[#f3f2ea]/90"></div>

      {/* Content */}
      <motion.div
        ref={containerRef}
        className="relative z-10 max-w-xl w-full space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Title */}
        <p ref={textRef} className="font-semibold text-[#6fa322] uppercase tracking-wide font-[Cormorant_Garamond]"
        style={{ fontSize: `${fontSize}px` }}
        >
          {wrapLevel === 1 ? (
            <>
              Cảm Ơn Vì Đã Là Một Phần Trong Hành Trình Này
            </>
          ) : (
            <>
              Cảm Ơn Vì Đã Là Một Phần<br />
              Trong Hành Trình Này
            </>
          )}
        </p>

        {/* Divider line */}
        <div className="w-24 h-[2px] bg-[#6fa322] my-2"></div>

        {/* Paragraphs */}
        <div className="text-[14px] md:text-[16px] leading-relaxed text-gray-700 text-family space-y-5">
          <p>
            Chúng tôi xin gửi lời cảm ơn chân thành và sâu sắc nhất đến toàn thể quý quan khách, người thân và bạn bè gần xa — 
            những người đã dành thời gian, tình cảm và lời chúc tốt đẹp cho chúng tôi trong ngày trọng đại này.
          </p>

          <p>
            Dù quý vị đã hiện diện để cùng chung vui, hay vì khoảng cách và công việc mà không thể đến dự, 
            chúng tôi vẫn luôn cảm nhận được tình yêu thương và sự quan tâm nồng hậu của mọi người.
          </p>

          <p>
            Mỗi lời chúc, mỗi tin nhắn, mỗi sự hiện diện — dù bằng bất kỳ hình thức nào — 
            đều là niềm hạnh phúc to lớn và là món quà quý giá mà chúng tôi sẽ luôn trân trọng.
          </p>

          <p>
            Xin chân thành cảm ơn và kính chúc mọi người luôn mạnh khỏe, bình an và hạnh phúc.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-6 text-[14px] text-gray-800 italic font-[Great_Vibes] text-right pr-4">
          Trân trọng,<br />{groom ? "Thế Hợp & Mai Anh" : "Mai Anh & Thế Hợp"}
        </div>
      </motion.div>
    </div>
  );
}

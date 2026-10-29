import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "../reveal";
import flower from "../../assets/images/imgSvg/flower-small.svg";
import outro from "../../assets/images/imgSvg/bottom-outro.svg";
import intro from "../../assets/images/imgSvg/flower.svg";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";
import { useCountdown } from "../../hooks/useCountdown";

export interface IEventProps {
  groom: boolean;
}

export default function Event({ groom }: IEventProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const fullText = `THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC ${groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"
    }`;
  const firstLine = `THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI`;
  const { wrapLevel, fontSize } = useAutoWrapText(
    textRef,
    containerRef,
    fullText,
    firstLine,
    { defaultFont: 14, minFont: 8 }
  );
    const targetDate: Date = new Date(import.meta.env.VITE_EVENT_END)
    const timeLeft = useCountdown(targetDate);

    if(!timeLeft) return null

  return (
    <div className="relative w-full pb-6 px-4 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-[650px] mx-auto text-center text-[#6fa322]"
      >
        <Reveal
          as="img"
          anim="zoom-in"
          delay={0.6}
          src={intro}
          alt="flower"
          className="w-30 mx-auto mb-10"
        />

        {/* === Lời mời === */}
        <Reveal
          as="p"
          anim="fade-up"
          duration={1.5}
          className="md:text-base uppercase tracking-wider font-medium leading-relaxed"
          style={{ fontSize: `${fontSize}px`, fontWeight: "bold" }}
        >
          TRÂN TRỌNG KÍNH MỜI
        </Reveal>

        {/* === Text chia dòng hoặc scale === */}
        <motion.p
          ref={textRef}
          className="uppercase tracking-wider font-medium mb-6 leading-relaxed whitespace-pre-line transition-[font-size] duration-300"
          style={{ fontSize: `${fontSize}px` }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {wrapLevel === 1 ? (
            <>
              THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC{" "}
              {groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"}
            </>
          ) : (
            <>
              THAM DỰ BỮA TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI<br />
              VÀO LÚC {groom ? "17 GIỜ 00 PHÚT" : "11 GIỜ 30 PHÚT"}
            </>
          )}
        </motion.p>

        {/* === Ngày giờ === */}
        <Reveal
          as="p"
          anim="fade-up"
          duration={1.5}
          className="text-sm md:text-sm font-semibold tracking-widest mb-3"
        >
          {groom ? "THỨ BẢY" : "THỨ SÁU"}
        </Reveal>

        <div className="flex items-center justify-center space-x-4 mb-2">

          <Reveal
            as="div"
            anim="fade-right"
            duration={1.5}
            className="text-sm md:text-base font-medium tracking-wider"
          >
            THÁNG 11
          </Reveal>
          <Reveal
            as="div"
            anim="fade-up"
            duration={1.5}
            className="text-6xl md:text-7xl font-bold text-[#6fa322] leading-none drop-shadow-sm"
          >
            {groom ? "08" : "07"}
          </Reveal>
          <Reveal
            as="div"
            anim="fade-left"
            duration={1.5}
            className="text-sm md:text-base font-medium tracking-wider"
          >
            NĂM 2025
          </Reveal>
        </div>

        <Reveal
          as="p"
          anim="fade-up"
          duration={1.5}
          className="text-xs md:text-sm italic text-[#6fa322]/80 mb-2"
        >
          {groom
            ? "(Tức ngày 19 tháng 9 năm Ất Tỵ)"
            : "(Tức ngày 18 tháng 9 năm Ất Tỵ)"}
        </Reveal>

        <Reveal
          as="img"
          anim="zoom-in"
          delay={0.6}
          src={flower}
          alt="flower"
          className="w-20 mx-auto my-4"
        />

        <Reveal
          as="h2"
          anim="fade-up"
          duration={1.5}
          className="text-lg tracking-wide font-semibold uppercase mb-1"
        >
          TẠI {groom ? "TƯ GIA NHÀ TRAI" : "NHÀ HÀNG VIỆT NAM"}
        </Reveal>

        <Reveal
          as="p"
          anim="fade-up"
          duration={1.5}
          className="text-sm md:text-sm text-[#6fa322]"
        >
          Địa chỉ:{" "}
          {groom
            ? "Xã Hát Môn, Phúc Thọ, Hà Nội"
            : "Số 15 Ngõ 2 Quang Trung, Hà Đông, Hà Nội"}
        </Reveal>

        <Reveal
          as="button"
          anim="zoom-in-up"
          delay={1}
          className="flex shadow-xl items-center gap-2 mx-auto mt-5 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322]/90 hover:text-white transition-colors"
          onClick={() =>
            window.open(
              groom
                ? "https://maps.app.goo.gl/EXm9vsPyDJN2GAaR6"
                : "https://maps.app.goo.gl/pFxQmyfuHvHYAoDw8",
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          CHỈ ĐƯỜNG
        </Reveal>

        <Reveal
          as="img"
          anim="zoom-in"
          delay={0.6}
          src={outro}
          alt="flower"
          className="w-30 mx-auto mt-6"
        />
      </div>
    </div>
  );
}

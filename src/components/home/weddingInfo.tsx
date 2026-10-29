import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "../reveal";
import ring from "../../assets/images/imgSvg/ring.svg";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";

export interface IEventProps {
    groom: boolean;
}

export default function Event(props: IEventProps) {
    const { groom } = props;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);

    const fullText = `${groom ? "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 15 GIỜ 30 PHÚT" : "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 13 GIỜ 00 PHÚT"}`;
    const firstLine = `${groom ? "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA" : "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI TƯ GIA"}}`;
    const { wrapLevel, fontSize } = useAutoWrapText(
        textRef,
        containerRef,
        fullText,
        firstLine,
        { defaultFont: 14, minFont: 8 }
    );

    return (
        <div className="relative w-full max-w-[600px] mx-auto p-4 lg:py-8 overflow-hidden">
            {/* Nền nhạt đồng bộ với WeddingFamilyInfo */}

            {/* Nội dung chính */}
            <div ref={containerRef} className="relative w-full max-w-[650px] mx-auto text-center text-[#6fa322]">
                {/* Lời mời */}
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
                            {groom
                                ? "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 15 GIỜ 30 PHÚT"
                                : "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC 13 GIỜ 00 PHÚT"}
                        </>
                    ) : (
                        <>
                            {groom
                                ? (
                                    <>
                                        LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA
                                        <br />
                                        VÀO LÚC 15 GIỜ 30 PHÚT
                                    </>
                                )
                                : (
                                    <>
                                        LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI TƯ GIA
                                        <br />
                                        VÀO LÚC 13 GIỜ 00 PHÚT
                                    </>
                                )}
                        </>
                    )}
                </motion.p>

                {/* Ngày trong tuần */}
                <Reveal
                    as="p"
                    anim="fade-up"
                    duration={1.5}
                    className="text-sm md:text-base font-semibold tracking-widest mb-3"
                >
                    THỨ BẢY
                </Reveal>

                {/* Khối tháng - ngày - năm */}
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
                        className="text-6xl md:text-7xl font-bold text-[#6fa322] mx-2 leading-none drop-shadow-sm"
                    >
                        08
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

                {/* Ngày âm lịch */}
                <Reveal
                    as="p"
                    anim="fade-up"
                    duration={1.5}
                    className="text-xs md:text-sm italic text-[#6fa322]/80 mb-2"
                >
                    (Tức ngày 19 tháng 9 năm Ất Tỵ)
                </Reveal>

                {/* Icon nhẫn */}
                <Reveal
                    as="img"
                    anim="zoom-in"
                    delay={0.6}
                    src={ring}
                    alt="ring"
                    className="w-20 mx-auto mb-3"
                />

                {/* Địa chỉ */}
                <Reveal
                    as="p"
                    anim="fade-up"
                    duration={1.5}
                    className="text-sm md:text-sm text-[#6fa322]"
                >
                    Địa chỉ:{" "}
                    {groom
                        ? "Xã Hát Môn, Phúc Thọ, Hà Nội"
                        : "Ngõ 2 Tổ 11 Quang Trung, Hà Đông, Hà Nội"}
                </Reveal>
            </div>
        </div>
    );
}

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ring from "../../assets/images/imgSvg/ring.svg";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";

export interface IEventProps {
    groom: boolean;
}

export default function Event(props: IEventProps) {
    const { groom } = props;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
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
                <p
                    ref={textRef}
                    className="uppercase tracking-wider font-medium mb-6 leading-relaxed whitespace-pre-line transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    style={{ fontSize: `${fontSize}px` }}
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
                </p>

                {/* Ngày trong tuần */}
                <p
                    className="text-sm md:text-base font-semibold tracking-widest mb-3"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                >
                    THỨ BẢY
                </p>

                {/* Khối tháng - ngày - năm */}
                <div className="flex items-center justify-center space-x-4 mb-2">
                    <div
                        className="text-sm md:text-base font-medium tracking-wider"
                        data-aos="fade-right"
                        data-aos-duration="1500"
                    >
                        THÁNG 11
                    </div>

                    <div
                        className="text-6xl md:text-7xl font-bold text-[#6fa322] mx-2 leading-none drop-shadow-sm"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        08
                    </div>

                    <div
                        className="text-sm md:text-base font-medium tracking-wider"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                    >
                        NĂM 2025
                    </div>

                    <div
                        className="hidden sm:block w-16 border-t border-[#6fa322]"
                        data-aos="zoom-in"
                        data-aos-delay="600"
                    />
                </div>

                {/* Ngày âm lịch */}
                <p
                    className="text-xs md:text-sm italic text-[#6fa322]/80 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                >
                    (Tức ngày 19 tháng 9 năm Ất Tỵ)
                </p>

                {/* Icon nhẫn */}
                <img
                    src={ring}
                    alt="ring"
                    className="w-20 mx-auto mb-3"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                />

                {/* Địa chỉ */}
                <p
                    className="text-sm md:text-sm text-[#6fa322]"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                >
                    Địa chỉ:{" "}
                    {groom
                        ? "Xã Hát Môn, Phúc Thọ, Hà Nội"
                        : "Ngõ 2 Tổ 11 Quang Trung, Hà Đông, Hà Nội"}
                </p>
            </div>
        </div>
    );
}

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAutoWrapText } from "../../hooks/useAutoWrapText";
import slide1 from "../../assets/images/album/DXT08807.webp";
import slide2 from "../../assets/images/album/KID02653.webp";
import slide3 from "../../assets/images/album/KID01919.webp";

export interface IWeddingFamilyInfoProps {
    groom?: boolean;
}

export default function WeddingFamilyInfo({ groom = true }: IWeddingFamilyInfoProps) {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1200,
        fade: true,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false,
        pauseOnHover: false,
    };

    const groomInfo = {
        title: "NHÀ TRAI",
        name: "Ông: Nguyễn Thế Cự",
        wife: "Bà: Kim Thị Hoà",
    };

    const brideInfo = {
        title: "NHÀ GÁI",
        name: "Ông: Nguyễn Văn Cao",
        wife: "Bà: Nguyễn Thị Thanh",
    };

    const groomName = "Thế Hợp";
    const brideName = "Mai Anh";

    // Logic đảo vị trí hai bên
    const leftInfo = groom ? groomInfo : brideInfo;
    const rightInfo = groom ? brideInfo : groomInfo;

    const fullText = `${groom ? groomName : brideName} & ${groom ? brideName : groomName}`;
    const firstLine = `${groom ? groomName : brideName}`;
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const { wrapLevel, fontSize } = useAutoWrapText(textRef, containerRef, fullText, firstLine, {
        defaultFont: 42,
        minFont: 24,
    });

    return (
        <div className="relative overflow-hidden w-full max-w-[600px] mx-auto text-center font-family px-4 py-4">
            {/* === HÌNH ẢNH CÔ DÂU CHÚ RỂ === */}
            <div className="w-full overflow-hidden rounded-2xl shadow-md mb-6">
                <Slider {...settings}>
                    {[slide1, slide2, slide3].map((slide, i) => (
                        <div key={i} className="relative">
                            <img
                                src={slide}
                                alt={`Slide ${i + 1}`}
                                className="w-full ml-4 h-auto object-cover object-center animate-zoomIn"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* === KHUNG CHUNG === */}
            <div ref={containerRef} className="py-5">
                {/* === Tên cô dâu & chú rể === */}
                <h3
                    ref={textRef}
                    className="pinyon-script-regular font-bold text-[#6fa322] leading-tight transition-all duration-300"
                    style={{
                        fontSize: `${fontSize}px`,
                        textShadow:
                            "2px 2px 6px rgba(0, 0, 0, 0.25), 0 0 8px rgba(111, 163, 34, 0.3)",
                    }}
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                >

                    {wrapLevel === 1 ? (
                        <div className="whitespace-nowrap">
                            {groom ? groomName : brideName} & {groom ? brideName : groomName}
                        </div>
                    ) : (
                        <>
                            <div>{groom ? groomName : brideName}</div>
                            <div>&</div>
                            <div>{groom ? brideName : groomName}</div>
                        </>
                    )}
                </h3>

                {/* Hai bên nhà */}
                <div className="flex mt-4 pt-4 justify-between items-start text-center text-[14px] md:text-[16px]">
                    {/* Bên trái */}
                    <div
                        className="flex-1 min-w-0 pr-4 whitespace-nowrap overflow-hidden text-ellipsis"
                        data-aos="fade-right"
                        data-aos-duration="1500"
                    >
                        <h4 className="font-semibold text-[#6fa322] uppercase mb-1 truncate">
                            {leftInfo.title}
                        </h4>
                        <p className="text-[#6fa322] truncate">{leftInfo.name}</p>
                        <p className="text-[#6fa322] truncate">{leftInfo.wife}</p>
                    </div>

                    {/* Bên phải */}
                    <div
                        className="flex-1 min-w-0 pl-4 whitespace-nowrap overflow-hidden text-ellipsis"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                    >
                        <h4 className="font-semibold text-[#6fa322] uppercase mb-1 truncate">
                            {rightInfo.title}
                        </h4>
                        <p className="text-[#6fa322] truncate">{rightInfo.name}</p>
                        <p className="text-[#6fa322] truncate">{rightInfo.wife}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

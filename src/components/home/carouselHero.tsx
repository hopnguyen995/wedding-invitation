import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/images/slide/anh1.png";
import slide2 from "../../assets/images/slide/anh2.jpg";
import slide3 from "../../assets/images/slide/anh3.jpg";

export interface ICarouselHeroProps {
  groom: boolean;
}

export default function CarouselHero({ groom }: ICarouselHeroProps) {
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

  return (
    <div className="section-hero relative w-full h-[100svh] overflow-hidden">
      <Slider {...settings}>
        {[slide1, slide2, slide3].map((slide, i) => (
          <div key={i} className="relative group">
            <img
              src={slide}
              alt={`Slide ${i + 1}`}
              className="
                w-full h-[100svh]
                object-cover object-center
                animate-zoomIn
              "
            />
            {/* Overlay gradient giúp chữ nổi bật */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10"></div>
          </div>
        ))}
      </Slider>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* PC view */}
        <div className="hidden md:block px-10 py-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl animate-fadeIn">
          <h1 className="text-great-vibes text-white text-[5vw] xl:text-[4vw] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] leading-tight">
            {groom ? "Mai Anh & Thế Hợp" : "Thế Hợp & Mai Anh"}
          </h1>
        </div>

        {/* Mobile view */}
        <div className="md:hidden px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm animate-fadeIn">
          <h1 className="text-great-vibes text-white text-[10vw] sm:text-[8vw] drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] leading-tight">
            {groom ? "Mai Anh & Thế Hợp" : "Thế Hợp & Mai Anh"}
          </h1>
        </div>
      </div>
    </div>
  );
}

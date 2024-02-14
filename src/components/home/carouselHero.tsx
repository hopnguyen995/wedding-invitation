import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/images/zs-slideshow-hero-1.jpg";
import slide2 from "../../assets/images/zs-slideshow-hero-2.jpg";
import slide3 from "../../assets/images/zs-slideshow-hero-3.jpg";

export interface ICarouselHeroProps {}

export default function CarouselHero(props: ICarouselHeroProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // Tốc độ chuyển động (ms)
    autoplay: true, // Tự chuyển động
    autoplaySpeed: 5000, // Thời gian giữa các slide (ms)
    fade: true, // Hiệu ứng làm mờ
    arrows: false,
  };

  return (
    <div className="section-hero relative">
      <div className="carousel-hero w-full">
        <Slider {...settings}>
          <div>
            <img
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full object-cover object-center"
              src={slide1}
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full object-cover object-center"
              src={slide2}
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full object-cover object-center"
              src={slide3}
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
      <div className="wrapper-hero absolute w-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="">
          <div className="content-text">
            <p className="text-center text-[#fff] font-medium text-[10px] sm:text-[12px] lg:text-[20px] uppercase">
              save the date
            </p>
            <p className="text-great-vibes text-[24px] sm:text-[40px] lg:text-[60px] xl:text-[80px] text-center text-[#fff] pt-3">
              Hoàng Hiệp & Minh Nguyệt
            </p>
            <div className="text-center">
              <p className="text-[#fff] font-medium text-[12px] sm:text-[14px] lg:text-[20px] border-b-2 border-solid border-white inline-block">
                February 25, 2024
              </p>
            </div>
          </div>
          <i className="fas fa-heart absolute text-[180px] md:text-[260px] lg:text-[400px] text-heart-rgba top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"></i>
        </div>
      </div>
    </div>
  );
}

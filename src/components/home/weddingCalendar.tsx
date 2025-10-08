import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import bgFlower from "../../assets/images/imgSvg/hero-img-right.svg";

export default function NovemberCalendar() {
  const daysInMonth = 30;
  const startDay = 5;
  const markedDay = 8;

  const days = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i < startDay ? "" : i - startDay + 1
  );

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-10 px-4 lg:py-16"
      style={{
        backgroundImage: `url(${bgFlower})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "right center",
      }}
    >
      {/* Overlay trắng nhẹ để nổi chữ */}
      <div className="absolute inset-0 bg-[#f3f2ea]/80 backdrop-blur-[1px]"></div>

      {/* Calendar container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center 
        mx-auto bg-gradient-to-br from-[#6fa322]/90 to-[#8fbf44]/90 
        text-white text-family rounded-3xl shadow-xl
        border border-white/30 backdrop-blur-md
        w-full max-w-[400px] md:max-w-[500px] p-6"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-semibold mb-4 text-great-vibes tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          November
        </motion.h1>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 text-center">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
            <div
              key={d}
              className="font-medium text-xs md:text-sm tracking-wider text-white/80 uppercase"
            >
              {d}
            </div>
          ))}

          {days.map((day, i) => (
            <motion.div
              key={i}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full 
              ${
                day === markedDay
                  ? "bg-white text-[#6fa322] font-bold ring-4 ring-[#f5efed]/60 scale-110 shadow-md"
                  : day
                  ? "text-white/90 hover:bg-white/20 transition"
                  : ""
              }`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.03 * i }}
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Footer text */}
        {/* <p className="mt-6 text-white/80 italic text-sm md:text-base">
          Save the date — <span className="font-bold text-white">08.11.2025</span>
        </p>*/}
      </div>
    </div>
  );
}

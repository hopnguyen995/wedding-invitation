import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2024-02-25T00:00:00").getTime();

  const formatNumber = (number: number) => {
    return number.toString().padStart(2, "0");
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
    const days = formatNumber(Math.floor(difference / (1000 * 60 * 60 * 24)));
    const hours = formatNumber(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = formatNumber(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = formatNumber(Math.floor((difference % (1000 * 60)) / 1000));
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [targetDate]);

  return (
    <div className="section-countdown mt-8 h-[250px]">
      <div className="md:flex md:justify-around md:items-center absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[70%]">
        <div className="text-great-vibes text-[#fff] p-3">
          <p className="text-[20px] lg:text-[30px]">Counting the minutes for.....</p>
          <p className="text-[36px] lg:text-[60px]">The big day</p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-center bg-timeblock-rgba w-[70px] h-[100px] p-2 border-4 border-solid border-[#ccc] rounded-md">
            <p className="font-medium text-[30px] text-[#f23b43]">{timeLeft.days}</p>
            <p className="text-[#f23b43]">Ngày</p>
          </div>
          <div className="flex flex-col items-center bg-timeblock-rgba w-[70px] h-[100px] p-2 border-4 border-solid border-[#ccc] rounded-md">
            <p className="font-medium text-[30px] text-[#f23b43]">{timeLeft.hours}</p>
            <p className="text-[#f23b43]">Giờ</p>
          </div>
          <div className="flex flex-col items-center bg-timeblock-rgba w-[70px] h-[100px] p-2 border-4 border-solid border-[#ccc] rounded-md">
            <p className="font-medium text-[30px] text-[#f23b43]">{timeLeft.minutes}</p>
            <p className="text-[#f23b43]">Phút</p>
          </div>
          <div className="flex flex-col items-center bg-timeblock-rgba w-[70px] h-[100px] p-2 border-4 border-solid border-[#ccc] rounded-md">
            <p className="font-medium text-[30px] text-[#f23b43]">{timeLeft.seconds}</p>
            <p className="text-[#f23b43]">Giây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

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
    <div>
      <p>Thời gian còn lại:</p>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <p className="font-medium text-[30px]">{timeLeft.days}</p>
          <p>Ngày</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium text-[30px]">{timeLeft.hours}</p>
          <p>Giờ</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium text-[30px]">{timeLeft.minutes}</p>
          <p>Phút</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium text-[30px]">{timeLeft.seconds}</p>
          <p>Giây</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

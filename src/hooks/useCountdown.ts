// 📁 src/hooks/useCountdown.ts
import { useState, useEffect } from "react";

const formatNumber = (num: number) => num.toString().padStart(2, "0");

export const useCountdown = (targetDate: Date = new Date("2025-11-08T00:00:00")) => {
  const getTimeLeft = () => {
    const now = Date.now();
    const difference = targetDate.getTime() - now;
    if (difference <= 0) return null;

    const days = formatNumber(Math.floor(difference / (1000 * 60 * 60 * 24)));
    const hours = formatNumber(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = formatNumber(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = formatNumber(Math.floor((difference % (1000 * 60)) / 1000));

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    if (!timeLeft) return; // Dừng khi hết thời gian
    const timer = setInterval(() => setTimeLeft(getTimeLeft), 1000);
    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  return timeLeft;
};

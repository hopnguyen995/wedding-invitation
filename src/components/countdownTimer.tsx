import { useCountdown } from "../hooks/useCountdown";

const CountdownTimer = () => {
  const timeLeft = useCountdown();

  if (!timeLeft) return null; // Ẩn khi hết thời gian

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <div className="section-countdown h-[250px]">
      <div className="md:flex md:justify-around md:items-center absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[70%]">
        <div className="pinyon-script-regular text-[#f5efed] p-3">
          <p className="text-[20px] lg:text-[30px]">Counting the minutes for.....</p>
          <p className="text-[36px] lg:text-[60px]">The big day</p>
        </div>
        <div className="flex gap-3">
          {timeUnits.map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#f3f2ea]/80 flex flex-col items-center w-[70px] h-[100px] p-2 border-4 border-solid border-[#ccc] rounded-md"
            >
              <p className="font-medium text-[30px] text-[#6fa322]">{value}</p>
              <p className="text-[#6fa322]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

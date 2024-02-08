import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const ConfettiCongratulations = () => {
  const { width, height } = useWindowSize();

  const drawFlower = (ctx: any) => {
    // Vẽ đầu hoa
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
    // Vẽ cánh hoa
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.rotate((72 * Math.PI) / 180); // 360/5 để có 5 cánh hoa
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(5, 5, 10, 0);
      ctx.quadraticCurveTo(5, -5, 0, 0);
      ctx.fillStyle = "pink";
      ctx.fill();
      ctx.closePath();
    }
  };

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={10}
        wind={0}
        gravity={0.02}
        drawShape={(ctx) => drawFlower(ctx)}
      />
    </>
  );
};

export default ConfettiCongratulations;

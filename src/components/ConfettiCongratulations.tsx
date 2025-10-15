import React, { useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiCongratulations = () => {
  useEffect(() => {
    const handleResize = () => {
      // Cập nhật kích thước Confetti khi cửa sổ thay đổi
      setConfettiSize({
        width: window.innerWidth - 20,
        height: document.documentElement.scrollHeight,
      });
    };
    const handleLoad = () => {
      // Gọi handleResize khi trang đã tải xong
      handleResize();
    };
    // Thêm sự kiện lắng nghe cho việc thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize);
    // Thêm sự kiện lắng nghe cho việc trang đã tải xong
    window.addEventListener("load", handleLoad);
    // Gọi handleResize một lần khi component được mount để đặt kích thước ban đầu
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const [confettiSize, setConfettiSize] = React.useState({
    width: window.innerWidth - 20,
    height: document.body.scrollHeight,
  });

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
      ctx.rotate((72 * Math.PI) / 180);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(5, 5, 10, 0);
      ctx.quadraticCurveTo(5, -5, 0, 0);
      ctx.fillStyle = "pink";
      ctx.fill();
      ctx.closePath();
    }
  };

  console.log("confettiSize: ", confettiSize);

  return (
    <div>
      <Confetti
        width={confettiSize.width}
        height={confettiSize.height}
        numberOfPieces={30}
        wind={0}
        gravity={0.02}
        drawShape={(ctx) => drawFlower(ctx)}
      />
    </div>
  );
};

export default ConfettiCongratulations;

import Home from "./components/home/home";
import { useMemo } from "react";

function App() {
  // 🧩 Lấy biến từ môi trường, chuyển thành boolean
  const groom = useMemo(() => {
    return import.meta.env.VITE_GROOM === "true";
  }, []);

  return (
    <div>
      <Home groom={groom} />
    </div>
  );
}

export default App;

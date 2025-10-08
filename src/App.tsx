//import ConfettiCongratulations from "./components/ConfettiCongratulations";
import Home from "./components/home/home";
import { useState } from "react";
function App() {
  const [groom] = useState(true);
  return (
    <div>
      {/* <ConfettiCongratulations /> */}
      <Home groom={groom} />
    </div>
  );
}

export default App;

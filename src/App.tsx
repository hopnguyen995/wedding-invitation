import ConfettiCongratulations from "./components/ConfettiCongratulations";
import CountdownTimer from "./components/countdown";
import MusicPlayer from "./components/music";
import MessengerButton from "./components/redirectMessenger";
import TestAos from "./components/testAos";

function App() {
  return (
    <div className="">
      <ConfettiCongratulations />
      <MusicPlayer />
      <CountdownTimer />
      <TestAos />
      <MessengerButton />
    </div>
  );
}

export default App;

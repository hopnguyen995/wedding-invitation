import ConfettiCongratulations from "./components/ConfettiCongratulations";
import MusicPlayer from "./components/music";
import MessengerButton from "./components/redirectMessenger";
import TestAos from "./components/testAos";

function App() {
  return (
    <>
      <ConfettiCongratulations />
      <div className="flex flex-col gap-5 w-[300px] mx-auto pt-[100px]">
        <MusicPlayer />
        <TestAos />
        <MessengerButton />
      </div>
    </>
  );
}

export default App;

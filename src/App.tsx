import ConfettiCongratulations from "./components/ConfettiCongratulations";
import MusicPlayer from "./components/music";
import MessengerButton from "./components/redirectMessenger";
import TestAos from "./components/testAos";

function App() {
  return (
    <>
      <ConfettiCongratulations />
      <div>
        <MusicPlayer />
        <TestAos />
        <MessengerButton />
      </div>
    </>
  );
}

export default App;

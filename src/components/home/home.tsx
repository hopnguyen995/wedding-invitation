import CountdownTimer from "../countdownTimer";
// import MessengerButton from "../redirectMessenger";
import CarouselHero from "./carouselHero";
import Info from "./info";
import imgGroom from "../../assets/images/groom-section-1.jpeg";
import imgBride from "../../assets/images/bride-section-1.jpeg";
import BestRegards from "./bestRegards";
import MusicPlayer from "../music";
import MessengerButton from "../redirectMessenger";

export interface IHomeProps {}

export default function Home() {
  return (
    <div>
      <CarouselHero />
      <BestRegards />
      <div>
        <Info urlImg={imgGroom} groom={true} />
        <Info urlImg={imgBride} groom={false} />
      </div>
      <CountdownTimer />
      <MessengerButton />
      <MusicPlayer />
    </div>
  );
}

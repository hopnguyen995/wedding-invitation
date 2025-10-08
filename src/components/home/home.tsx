import CountdownTimer from "../countdownTimer";
// import MessengerButton from "../redirectMessenger";
import CarouselHero from "./carouselHero";
import BestRegards from "./bestRegards";
import MusicPlayer from "../music";
// import MessengerButton from "../redirectMessenger";
import Event from "./event";
import WeddingCalender from "./weddingCalendar";
import Album from "./album";
import WeddingBox from "./weddingBox";
import WeddingInfo from "./weddingInfo";

export interface IHomeProps {groom: boolean;}

export default function Home(props: IHomeProps) {
  const { groom } = props;
  return (
    <div>
      <CarouselHero groom={groom} />
      <BestRegards />
      <WeddingInfo groom={groom} />
      <WeddingCalender />
      <Event groom={groom} />
      <Album />
      <WeddingBox groom={groom} />
      <CountdownTimer />
      <MusicPlayer />
    </div>
  );
}

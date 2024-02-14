import CountdownTimer from "../countdown";
import MessengerButton from "../redirectMessenger";
import CarouselHero from "./carouselHero";
import Info from "./info";
import imgGroom from "../../assets/images/groom-section-1.jpeg";
import imgBride from "../../assets/images/bride-section-1.jpeg";

export interface IHomeProps {}

export default function Home() {
  return (
    <div>
      <CarouselHero />
      <div className="container mx-auto">
        <Info urlImg={imgGroom} groom={true} />
        <Info urlImg={imgBride} groom={false} />
      </div>
      <CountdownTimer />
      <MessengerButton />
    </div>
  );
}

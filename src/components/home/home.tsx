import TestAos from "./testAos";
import CountdownTimer from "../countdown";
import MessengerButton from "../redirectMessenger";
import CarouselHero from "./carouselHero";

export interface IHomeProps {}

export default function Home() {
  return (
    <div>
      <CarouselHero />
      <TestAos />
      <CountdownTimer />
      <MessengerButton />
    </div>
  );
}

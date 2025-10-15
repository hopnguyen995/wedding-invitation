// src/pages/Home.tsx (hoặc src/components/Home.tsx)

import CountdownTimer from "../countdownTimer";
import MusicPlayer from "../music";
import Event from "./event";
import WeddingCalender from "./weddingCalendar";
import Album from "./album";
import WeddingBox from "./weddingBox";
import WeddingInfo from "./weddingInfo";
import WeddingFamilyInfo from "./weddingFamilyInfo";
import RSVPForm from "./RSVPForm"; 
import Thankyou from "./thankyou"; 

export interface IHomeProps { groom: boolean; }

export default function Home(props: IHomeProps) {
  const { groom } = props;
  return (
    <div>
      <WeddingFamilyInfo groom={groom} />
      
      <Event groom={groom} />
      <WeddingCalender />
      <WeddingInfo groom={groom} />
      <Album />
      <RSVPForm groom={groom} />
      <WeddingBox groom={groom} />
      <Thankyou groom={groom} />
      <CountdownTimer />
      {/* Music Player thường ở cuối hoặc được cố định (fixed) */}
      <MusicPlayer />
    </div>
  );
}
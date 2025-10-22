import { useMemo } from "react";
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

export default function Home({ groom }: IHomeProps) {
  // ✅ Mặc định hiển thị WeddingBox, chỉ ẩn nếu ?box=false hoặc ?box=0
  const showBox = useMemo(() => {
    if (typeof window === "undefined") return true; // tránh lỗi SSR
    const params = new URLSearchParams(window.location.search);
    const boxParam = params.get("box");
    return !(boxParam === "false" || boxParam === "0");
  }, []);

  return (
    <div>
      <WeddingFamilyInfo groom={groom} />
      <Event groom={groom} />
      <WeddingCalender />
      <WeddingInfo groom={groom} />
      <Album />
      <RSVPForm groom={groom} />
      {showBox && <WeddingBox groom={groom} />}
      <Thankyou groom={groom} />
      <CountdownTimer />
      <MusicPlayer />
    </div>
  );
}

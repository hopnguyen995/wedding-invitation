import { useMemo, lazy, Suspense } from "react";
import MusicPlayer from "../music";
import WeddingFamilyInfo from "./weddingFamilyInfo";
import Event from "./event";
import WeddingCalender from "./weddingCalendar";
import WeddingInfo from "./weddingInfo";

// ⏬ Các phần dưới màn hình đầu → tách chunk, tải sau để nhẹ bundle lần đầu
// (RSVPForm kéo theo sweetalert2, Album kéo theo nhiều ảnh...)
const Album = lazy(() => import("./album"));
const RSVPForm = lazy(() => import("./RSVPForm"));
const WeddingBox = lazy(() => import("./weddingBox"));
const Thankyou = lazy(() => import("./thankyou"));
const CountdownTimer = lazy(() => import("../countdownTimer"));

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
      <Suspense fallback={null}>
        <Album />
        <RSVPForm groom={groom} />
        {showBox && <WeddingBox groom={groom} />}
        <Thankyou groom={groom} />
        <CountdownTimer />
      </Suspense>
      <MusicPlayer />
    </div>
  );
}

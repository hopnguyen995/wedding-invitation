import EventItem from "./eventItem";
import nhagai1 from "../../assets/images/nha-gai.png";
import nhagai2 from "../../assets/images/nha-gai-2.png";
import nhatrai1 from "../../assets/images/nha-trai.png";
import nhatrai2 from "../../assets/images/nha-trai-2.png";

export interface IEventProps {}

export default function Event() {
  return (
    <div className="event-wrapper pt-8 md:pt-10 lg:pt-12">
      <div className="event-title text-center">
        <h3 className="capitalize text-great-vibes text-[24px] md:text-[30px] lg:text-[40px] inline-block bg-[#feebec] text-[#848383] px-3 border-t-[2px] border-b-[2px] border-[#f23b431a]">
          sự kiện cưới
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:w-[80%] xl:mx-auto lg:grid-cols-4 gap-5 p-4">
        <EventItem
          imgItem={nhagai2}
          title={`Tiệc cưới nhà gái`}
          address={`Xóm 4 xã Liên Sơn, Huyện Gia Viễn, Ninh Bình`}
          time={`15:30PM 24/02/2024`}
        />
        <EventItem
          imgItem={nhagai1}
          title={`Lễ cưới nhà gái`}
          address={`Xóm 4 xã Liên Sơn, Huyện Gia Viễn, Ninh Bình`}
          time={`11:30AM 25/02/2024`}
        />
        <EventItem
          imgItem={nhatrai2}
          title={`Tiệc cưới nhà trai`}
          address={`Xóm mới Lợi Hoà, xã Yên Lâm, Huyện Yên Mô, Ninh Bình`}
          time={`16:30PM & 07:30AM 24-25/02/2024`}
        />
        <EventItem
          imgItem={nhatrai1}
          title={`Lễ cưới nhà trai`}
          address={`Xóm mới Lợi Hoà, xã Yên Lâm, Huyện Yên Mô, Ninh Bình`}
          time={`13:30PM 25/02/2024`}
        />
      </div>
    </div>
  );
}

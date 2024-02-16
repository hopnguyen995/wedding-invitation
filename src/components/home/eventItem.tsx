export interface IEventItemProps {
  imgItem: string;
  title: string;
  address: string;
  time: string;
}

export default function EventItem(props: IEventItemProps) {
  const { imgItem, title, address, time } = props;
  return (
    <div className="event-item p-4">
      <div className="w-[60%] mx-auto lg:w-full">
        <img src={imgItem} className="rounded-full mx-auto" alt="item" />
      </div>
      <div className="text-center">
        <p className="uppercase font-semibold text-[#6e6e6e] my-2 text-[14px] md:text-[18px]">
          {title}
        </p>
        <p className="text-[#6e6e6e] mb-2 text-[12px] md:text-[16px]">
          <i className="fas fa-map-marker-alt mr-1 text-[#4e4e4e]"></i>
          <span className="">{address}</span>
        </p>
        <p className="text-[#6e6e6e] text-[12px] md:text-[16px]">
          <i className="far fa-clock mr-1 text-[#4e4e4e]"></i>
          <span>{time}</span>
        </p>
      </div>
    </div>
  );
}

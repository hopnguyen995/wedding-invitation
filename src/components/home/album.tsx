import anh1 from "../../assets/images/album/anh1.jpg";
import anh2 from "../../assets/images/album/anh2.jpg";
import anh3 from "../../assets/images/album/anh3.jpg";
import anh4 from "../../assets/images/album/anh4.jpg";
import anh5 from "../../assets/images/album/anh5.jpg";
import anh6 from "../../assets/images/album/anh6.jpg";
import anh7 from "../../assets/images/album/anh7.jpg";
import anh8 from "../../assets/images/album/anh8.jpg";
import anh9 from "../../assets/images/album/anh9.jpg";
import anh10 from "../../assets/images/album/anh10.jpg";
import anh11 from "../../assets/images/album/anh11.jpg";
import anh12 from "../../assets/images/album/anh12.jpg";

export interface IAlbumProps {}

export default function Album() {
  return (
    <div className="my-8 text-center px-4">
      <h3 className="capitalize text-great-vibes text-[24px] md:text-[30px] lg:text-[40px] inline-block bg-[#feebec] text-[#848383] px-3 border-t-[2px] border-b-[2px] border-[#f23b431a] mb-8 lg:mb-10">
        album hình cưới
      </h3>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 xl:w-[60%] xl:mx-auto">
        <div className="">
          <img className="w-full" src={anh1} alt="anh-1" />
        </div>
        <div className="">
          <img className="w-full" src={anh2} alt="anh-2" />
        </div>
        <div className="">
          <img className="w-full" src={anh3} alt="anh-3" />
        </div>
        <div className="">
          <img className="w-full" src={anh4} alt="anh-4" />
        </div>
        <div className="grid grid-cols-subgrid gap-3">
          <div className="">
            <img className="w-full" src={anh5} alt="anh-5" />
          </div>
          <div className="">
            <img className="w-full" src={anh6} alt="anh-6" />
          </div>
        </div>
        <div className="">
          <img className="w-full" src={anh7} alt="anh-7" />
        </div>
        <div className="grid grid-cols-subgrid gap-3">
          <div className="">
            <img className="w-full" src={anh8} alt="anh-8" />
          </div>
          <div className="">
            <img className="w-full" src={anh9} alt="anh-9" />
          </div>
        </div>
        <div className="">
          <img className="w-full" src={anh10} alt="anh-10" />
        </div>
        <div className="">
          <img className="w-full" src={anh11} alt="anh-11" />
        </div>
        <div className="">
          <img className="w-full" src={anh12} alt="anh-12" />
        </div>
      </div>
    </div>
  );
}

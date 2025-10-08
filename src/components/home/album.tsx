
export interface IAlbumProps {}

export default function Album() {
  return (
    <div
      className="relative lg:w-[100%] mx-auto p-4 lg:py-8 overflow-hidden py-10 text-center px-4">
      <div className="absolute inset-0 bg-[#f3f2ea]/80"></div>
      <h3 className="text-[24px] md:text-[30px] lg:text-[40px] inline-block text-family text-[#6fa322] uppercase">
        album hình cưới
      </h3>
    </div>
  );
}

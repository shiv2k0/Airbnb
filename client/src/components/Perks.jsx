import { AiOutlineWifi } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { MdOutlinePersonalVideo, MdOutlinePets } from "react-icons/md";

const Perks = ({ selected, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 flex-wrap">
        <label className="flex items-center gap-2 border p-4 rounded-2xl ">
          <input type="checkbox" />
          <AiOutlineWifi />
          <span className="whitespace-nowrap">Wifi</span>
        </label>
        <label className="flex items-center gap-2 border p-4 rounded-2xl ">
          <input type="checkbox" />
          <FaCar className="whitespace-nowrap" />
          <span className="whitespace-nowrap">Free parking spot</span>
        </label>
        <label className="flex items-center gap-2 border p-4 rounded-2xl ">
          <input type="checkbox" />
          <MdOutlinePersonalVideo />
          <span className="whitespace-nowrap">TV</span>
        </label>
        <label className="flex items-center gap-2 border p-4 rounded-2xl ">
          <input type="checkbox" />
          <MdOutlinePets />
          <span className="whitespace-nowrap">Pets</span>
        </label>
        <label className="flex items-center gap-2 border p-4 rounded-2xl ">
          <input type="checkbox" />
          <GiExitDoor />
          <span className="whitespace-nowrap">Private entrance</span>
        </label>
      </div>
    </>
  );
};

export default Perks;

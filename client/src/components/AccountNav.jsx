import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";

const AccountNav = () => {
  return (
    <div>
      <nav className="w-full flex  justify-center gap-2 my-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 p-2 px-6 bg-primary text-white rounded-full "
              : "flex items-center gap-1 p-2 px-6 bg-gray-200 rounded-full"
          }
          // className={`p-2 px-6 bg-primary text-white rounded-full `}
          to={"/account/profile"}
        >
          <FaRegUser />
          My Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 p-2 px-6 bg-primary text-white rounded-full "
              : "flex items-center gap-1 p-2 px-6 bg-gray-200 rounded-full"
          }
          to={"/account/bookings"}
        >
          <AiOutlineUnorderedList />
          My Bookings
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 p-2 px-6 bg-primary text-white rounded-full "
              : "flex items-center gap-1 p-2 px-6 bg-gray-200 rounded-full"
          }
          to={"/account/places"}
        >
          <BsBuildings />
          My accommodations
        </NavLink>
      </nav>
    </div>
  );
};

export default AccountNav;

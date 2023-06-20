import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/user/userSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";

const Account = () => {
  const user = useSelector(selectUser);
  const { subpage } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Signout = async () => {
    try {
      await axios.post("/api/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 ">
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
      {subpage === "profile" && (
        <div className="text-center mt-5">
          Logged in as {user?.name} ({user?.email})
          <br />
          <button onClick={Signout} className="primary max-w-sm mx-auto my-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;

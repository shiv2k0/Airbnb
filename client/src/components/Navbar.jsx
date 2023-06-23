import logo from "../assets/logo.png";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/user/userSlice";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userMenu, setUserMenu] = useState(false);
  const user = useSelector(selectUser);
  // console.log(user);
  const SignOut = async () => {
    await axios.post("/api/logout");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="py-4 px-6 border-b flex items-center justify-between">
      <Link to={"/"} className="md:flex-1 hidden md:flex items-center">
        <img src={logo} className="h-14 flex-nowrap  " alt="logo" />
      </Link>

      <div className="flex-1 flex items-center max-w-[412px] border gap-4 pl-10 pr-3 border-gray-300 rounded-full py-2 h-14  shadow-md">
        <div className="whitespace-nowrap cursor-pointer">Anywhere</div>
        <div className=" flex-1 border-l  border-gray-300 h-full" />
        <div className="whitespace-nowrap cursor-pointer">Any week</div>
        <div className=" flex-1 border-l  border-gray-300 h-full" />
        <div className="text-gray-500 cursor-pointer flex-1 w-24 whitespace-nowrap focus:outline-none">
          Add guests
        </div>
        <button className="h-10 w-10 bg-primary p-2 rounded-full text-white">
          <AiOutlineSearch size={25} />
        </button>
      </div>
      <div className="flex-1 flex items-center gap-5 justify-end">
        <Link
          to={"/account/places/new"}
          className="hidden lg:flex text-sm whitespace-nowrap ml-2"
        >
          Airbnb your home
        </Link>
        <BsGlobe size={20} className="ml-2 cursor-pointer" />
        <div
          onClick={() => setUserMenu((prev) => !prev)}
          className="flex items-center border gap-3 px-3 py-2 border-gray-300 rounded-full shadow-md relative cursor-pointer"
        >
          <AiOutlineMenu size={20} />
          <FaUserCircle size={30} className="" />
          {!!user && <div>{user?.name}</div>}
          {userMenu && (
            <div className="bg-white text-start p-0 flex flex-col gap-1 text-md justify-center w-56 h-36 absolute top-16 right-0 rounded-md drop-shadow-2xl z-20">
              {user ? (
                <>
                  <Link
                    to={"/account/profile"}
                    className="px-3 py-[1px] hover:bg-gray-100 cursor-pointer"
                  >
                    Account
                  </Link>
                  <div
                    onClick={SignOut}
                    className=" font-bold px-3 py-[1px] hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={"/register"}
                    className=" font-bold px-3 py-[1px] hover:bg-gray-100 cursor-pointer"
                  >
                    Sign up
                  </Link>
                  <Link
                    to={"/login"}
                    className="px-3 py-[1px] hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </Link>
                </>
              )}

              <div className="border-b py-[2px]" />

              <Link
                to={"/account/places/new"}
                className="px-3 py-[1px] hover:bg-gray-100 cursor-pointer"
              >
                Airbnb your house
              </Link>
              <div className="px-3 py-[1px] hover:bg-gray-100 cursor-pointer">
                Help
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;

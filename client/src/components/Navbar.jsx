import logo from "../assets/logo.png";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(false);

  return (
    <header className="py-4 h-24  mx-auto    flex justify-between">
      <Link to={"/"} className="md:flex-1 hidden md:flex items-center">
        <img src={logo} className="h-14 flex-nowrap  " alt="logo" />
      </Link>

      <div className="flex-1 flex items-center max-w-[412px] border gap-4 pl-10 pr-3 border-gray-300 rounded-full py-2  shadow-md">
        <div>Anywhere</div>
        <div className=" flex-1 border-l  border-gray-300 h-full" />
        <div className="whitespace-nowrap">Any week</div>
        <div className=" flex-1 border-l  border-gray-300 h-full" />
        <input
          className="text-gray-500 flex-1 w-24  focus:outline-none"
          placeholder="Add guests"
        />
        <button className="h-10 w-10 bg-primary p-2 rounded-full text-white">
          <AiOutlineSearch size={25} />
        </button>
      </div>
      <div className="flex-1 flex items-center gap-5 justify-end">
        <div className="hidden md:flex">Airbnb your home</div>
        <BsGlobe size={20} />
        <div
          onClick={() => setUserMenu((prev) => !prev)}
          className="flex items-center border gap-3 px-3 py-2 border-gray-300 rounded-full shadow-md relative cursor-pointer"
        >
          <AiOutlineMenu size={20} />
          <FaUserCircle size={30} className="" />
          {userMenu && (
            <div className="bg-white text-start p-0 flex flex-col gap-1 text-md justify-center w-56 h-36 absolute top-16 right-0 rounded-md drop-shadow-2xl ">
              <Link
                to={"/login"}
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

              <div className="border-b py-[2px]" />

              <div className="px-3 py-[1px] hover:bg-gray-100 cursor-pointer">
                Airbnb your house
              </div>
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

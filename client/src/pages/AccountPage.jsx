import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import ProfilePage from "./ProfilePage";

const Account = () => {
  const { subpage } = useParams();

  return (
    <div className="px-6 ">
      <AccountNav />
      {subpage === "profile" && (
        // <div className="text-center mt-5">
        //   Logged in as {user?.name} ({user?.email})
        //   <br />
        //   <button onClick={Signout} className="primary max-w-sm mx-auto my-2">
        //     Logout
        //   </button>
        // </div>
        <>
          <ProfilePage />
        </>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;

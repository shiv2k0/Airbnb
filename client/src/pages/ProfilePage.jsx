import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../features/user/userSlice";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const user = useSelector(selectUser);
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
    <>
      <AccountNav />
      <div className="text-center mt-5">
        Logged in as {user?.name} ({user?.email})
        <br />
        <button onClick={Signout} className="primary max-w-sm mx-auto my-2">
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;

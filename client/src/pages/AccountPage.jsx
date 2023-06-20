import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="px-6">
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
};

export default Account;

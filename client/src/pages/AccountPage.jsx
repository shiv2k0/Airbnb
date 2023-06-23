import { useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import ProfilePage from "./ProfilePage";

const Account = () => {
  const { subpage } = useParams();

  return (
    <div className="px-6 ">
      <AccountNav />
      {subpage === "profile" && (
        <>
          <ProfilePage />
        </>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;

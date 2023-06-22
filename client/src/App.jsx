import Home from "./components/IndexPage";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/user/userSlice";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./components/IndexPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesFormPage from "./components/PlacesFormPage";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      axios.get("/api/profile").then(({ data }) => {
        dispatch(login(data));
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          {/* <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

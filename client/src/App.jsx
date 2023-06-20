import Home from "./components/IndexPage";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/user/userSlice";
import Account from "./pages/AccountPage";
import IndexPage from "./components/IndexPage";

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
        // console.log(data);
      });
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

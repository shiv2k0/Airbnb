import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

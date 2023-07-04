import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", { email, password }).then(({ data }) => {
        dispatch(
          login({
            email: data.email,
            name: data.name,
            id: data._id,
          })
        );
      });
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };
  return (
    <div className="grow flex flex-col justify-center -mt-8">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form onSubmit={onSubmit} className="max-w-md mx-auto ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button onClick={onSubmit} type="submit" className="primary">
          Login
        </button>
        <div className="text-center  py-2 text-gray-500">
          Don't have an account yet?
          <Link to="/register" className="underline text-black ml-1">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

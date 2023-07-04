import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      alert("Registration successful. You can login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again later");
    }
  };
  return (
    <div className="grow flex flex-col justify-center -mt-8">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form onSubmit={registerUser} className="max-w-md mx-auto ">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <button onClick={registerUser} className="primary">
          Sign up
        </button>
        <div className="text-center py-2 text-gray-500">
          Already have an account?
          <Link to="/login" className="ml-1 underline text-black">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

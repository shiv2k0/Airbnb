import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grow flex flex-col justify-center -mt-8">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto ">
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?
          <Link to="/register" className="underline text-black">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

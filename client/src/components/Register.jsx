import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="grow flex flex-col justify-center -mt-8">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto ">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button className="primary">Sign up</button>
        <div className="text-center py-2 text-gray-500">
          Already have an account ?
          <Link to="/login" className="ml-1 underline text-black">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

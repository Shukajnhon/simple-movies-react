import React from "react";
import loginImg from "../assets/img/login.svg";
import Button from "../components/button/Button";

const Login = () => {
  return (
    <div className="login flex justify-between items-center h-[30rem] w-[80%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black">
      <div className="login-img w-2/4 h-full px-4 py-16 bg-primary rounded-tl-md rounded-bl-md animate-slideDown">
        <img className="w-full h-full" src={loginImg} alt="login" />
      </div>

      <div className="login-form w-2/4 h-full">
        <form
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 className="text-center font-bold text-3xl mb-10 ">Login</h2>
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="text"
            name=""
            id=""
            placeholder="UserName"
          />
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="password"
            name=""
            id=""
            placeholder="Password"
          />
          <div className="mb-3">
            <Button className="px-12 py-2 text-white">Login</Button>
          </div>

          <a href="/forgot" className="hover:text-primary transition-all">
            Forgot Password?
          </a>
          <span>
            Don't have an account?
            <a
              href="/register"
              className="ml-2 hover:text-primary transition-all"
            >
              Register
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

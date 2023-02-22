import React from "react";
import registerImg from "../assets/img/register.svg";
import Button from "../components/button/Button";

const RegisterPage = () => {
  return (
    <div className="flex justify-between items-center h-[30rem] w-[80%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black">
      <div class="w-2/4 h-full">
        <form
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 className="text-center font-bold text-3xl mb-10 ">Register</h2>
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="text"
            name=""
            id=""
            placeholder="UserName"
          />
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="email"
            name=""
            id=""
            placeholder="email"
          />
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="password"
            name=""
            id=""
            placeholder="Password"
          />

          <div className="mb-3">
            <Button className="px-12 py-2 text-white">Register</Button>
          </div>
          <span>
            Have an account?
            <a href="/login" className="ml-2 hover:text-primary transition-all">
              Login
            </a>
          </span>
        </form>
      </div>

      <div className="w-2/4 h-full px-4 py-16 bg-primary rounded-tr-md rounded-br-md animate-slideDown">
        <img className="w-full h-full" src={registerImg} alt="register" />
      </div>
    </div>
  );
};

export default RegisterPage;

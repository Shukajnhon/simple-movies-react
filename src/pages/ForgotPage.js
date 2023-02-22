import React from "react";
import {useNavigate} from "react-router-dom";
import forgot from "../assets/img/forgot.svg";
import Button from "../components/button/Button";

const ForgotPage = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center h-[30rem] w-[80%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black">
      <div class="w-2/4 h-full relative">
        <form
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 className="text-center font-bold text-3xl mb-10">
            Reset Password
          </h2>
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="email"
            name=""
            id=""
            placeholder="email"
          />

          <div className="mb-3">
            <Button className="px-12 py-2 text-white">Reset Password</Button>
          </div>
          <span>We will send you a reset link!</span>
        </form>
        <div
          className="close cursor-pointer absolute top-0 left-0"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="w-2/4 h-full px-4 py-16 bg-primary rounded-tr-md rounded-br-md animate-slideDown">
        <img className="w-full h-full" src={forgot} alt="forgot" />
      </div>
    </div>
  );
};

export default ForgotPage;

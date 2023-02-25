import React, {useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import registerImg from "../assets/img/register.svg";
import Button from "../components/button/Button.js";
import {firebaseAuth} from "../utils/firebase-config.js";

import {useNavigate} from "react-router-dom";
// import Input from "../components/input/Input";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Not an email")
      .required("Please enter your email"),
    password: yup.string().max(15).required("Please enter your password"),
  })
  .required();

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({resolver: yupResolver(schema), mode: "onChange"});

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleClickSubmit = (data) => {
    console.log(data);

    if (isValid) {
      // // create a new user
      const createUser = async () => {
        try {
          await createUserWithEmailAndPassword(
            firebaseAuth,
            data.email,
            data.password
          ).then((userCredential) => {
            const user = userCredential.user;
            console.log("user:", user);
            console.log("Successfully Register!");
          });
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode:", errorCode);
          console.log("errorMessage:", errorMessage);
        }
      };
      createUser();
    }

    setShowPassword(false);
  };

  // Check Current user
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = currentUser.uid;
        console.log("uid:", uid);
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="flex my-auto justify-between items-center h-[20rem] w-[100%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black sm:h-[30rem] sm:w-[80%]">
      <div className="w-2/3 sm:w-2/4 h-full">
        <form
          type="submit"
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 className="text-center font-bold text-3xl mb-3 sm:mb-10 ">
            Register
          </h2>

          <input
            className="p-2 w-[90%] sm:w-[70%] mb-3 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-sm  text-red-500">
              {errors.email.message}
            </span>
          )}
          <div className="w-[90%] sm:w-[70%] flex justify-between items-center relative">
            <input
              className="p-2 w-full  mb-3 rounded-md"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            ></input>
            <span
              className="absolute right-0 -translate-x-2 -translate-y-1 cursor-pointer transition-all"
              onClick={handleToggle}
            >
              {!showPassword ? <EyeInvisible></EyeInvisible> : <Eye></Eye>}
            </span>
          </div>
          {errors?.password && (
            <p className="text-sm  text-red-500">{errors.password.message}</p>
          )}
          <div className="mb-3">
            <Button
              onClick={handleSubmit(handleClickSubmit)}
              className="px-12 py-2 text-white"
            >
              Register
            </Button>
          </div>
          <span>
            Have an account?
            <a href="/login" className="ml-2 hover:text-primary transition-all">
              Login
            </a>
          </span>
        </form>
      </div>

      <div className=" w-2/5 h-full px-4 py-16 bg-primary rounded-tr-md rounded-br-md animate-slideDown sm:w-2/4">
        <img className="w-full h-full" src={registerImg} alt="register" />
      </div>
    </div>
  );
};

const Eye = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const EyeInvisible = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
};

export default RegisterPage;

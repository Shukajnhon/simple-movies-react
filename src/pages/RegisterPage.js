import React, {useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import registerImg from "../assets/img/register.svg";
import Button from "../components/button/Button";
import {firebaseAuth} from "../utils/firebase-config";

import {useNavigate} from "react-router-dom";
// import Input from "../components/input/Input";

const RegisterPage = () => {
  // const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue((prev) => {
      const {name, value} = e.target;
      // console.log([name], value);
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log("value:", value);
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    console.log(formValue);

    // // create a new user
    createUser();

    setFormValue({
      username: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  };

  // create a new user
  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        formValue.email,
        formValue.password
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

  // Check Current user
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = currentUser.uid;
      console.log("uid:", uid);
      navigate("/");
    }
  });

  return (
    <div className="flex justify-between items-center h-[30rem] w-[80%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black">
      <div className="w-2/4 h-full">
        <form
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 className="text-center font-bold text-3xl mb-10 ">Register</h2>

          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formValue.username}
            onChange={handleChange}
          />
          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={formValue.email}
            onChange={handleChange}
          />
          <div className="w-[70%] flex justify-between items-center relative">
            <input
              className="p-2 w-full  mb-3 rounded-md"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
            ></input>
            <span
              className="absolute right-0 -translate-x-2 -translate-y-1 cursor-pointer transition-all"
              onClick={handleToggle}
            >
              {!showPassword ? <EyeInvisible></EyeInvisible> : <Eye></Eye>}
            </span>
          </div>

          <div className="mb-3">
            <Button onClick={handleSubmit} className="px-12 py-2 text-white">
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

      <div className="w-2/4 h-full px-4 py-16 bg-primary rounded-tr-md rounded-br-md animate-slideDown">
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

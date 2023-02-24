import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import loginImg from "../assets/img/login.svg";
import Button from "../components/button/Button";
import {firebaseAuth} from "../utils/firebase-config";

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormValue((prevValue) => {
      const {name, value} = e.target;

      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    console.log(formValue);
    setFormValue((prevValue) => {
      // SignIn
      signIn();

      return {
        ...prevValue,
        password: "",
      };
    });
  };

  const signIn = async () => {
    try {
      const {email, password} = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user:", user);
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      setSuccess(false);
      const wrongEle = document.querySelector("#wrong");
      wrongEle.innerText = errorCode.slice(5);
      // const node = document.createElement("div");
      // const textNode = document.createTextNode(`${errorCode}`);
      // node.appendChild(textNode);
      // document.getElementById("heading").appendChild(node);
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
    <div className="login flex justify-between items-center h-[30rem] w-[80%] mx-auto rounded-md bg-gray-300 shadow-[0_3px_30px_rgba(0, 0, 0, 0.5)]  text-black">
      <div className="login-img w-2/4 h-full px-4 py-16 bg-primary rounded-tl-md rounded-bl-md animate-slideDown">
        <img className="w-full h-full" src={loginImg} alt="login" />
      </div>

      <div className="login-form w-2/4 h-full">
        <form
          action=""
          className="w-full h-full flex flex-col justify-center items-center animate-slideUp"
        >
          <h2 id="heading" className="text-center font-bold text-3xl mb-10">
            Login
          </h2>

          <input
            className="p-2 w-[70%] mb-3 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />
          <div className="w-[70%] relative">
            <input
              className="p-2 w-full mb-3 rounded-md"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="email"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-0 -translate-x-2 translate-y-2 cursor-pointer transition-all"
              onClick={handleToggle}
            >
              {!showPassword ? <EyeInvisible></EyeInvisible> : <Eye></Eye>}
            </span>
          </div>
          {!success ? (
            <span id="wrong" className="text-sm text-red-500 mb-3">
              {/* Wrong password or email */}
            </span>
          ) : (
            ""
          )}
          <div className="mb-3">
            <Button onClick={handleSubmit} className="px-12 py-2 text-white">
              Login
            </Button>
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

export default Login;

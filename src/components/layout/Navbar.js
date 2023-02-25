import React, {useEffect, useState} from "react";
import logo from "../../assets/logo/logoMovies.png";
import {NavLink, useNavigate} from "react-router-dom";
import {
  // FaSearch,
  FaRegBell,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa/index.esm.js";
import {firebaseAuth} from "../../utils/firebase-config.js";
import {onAuthStateChanged, signOut} from "firebase/auth";
// import SearchMovies from "../search/SearchMovies";

const Navbar = () => {
  // const [showSearch, setShowSearch] = useState(false);
  // const [inputHover, setInputHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogOut, setIsLogOut] = useState(true);

  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // signOut
  const handleLogOut = async () => {
    try {
      await signOut(firebaseAuth);
      navigate("/login");
      console.log("Log Out successful");
      setIsLogOut(true);
    } catch (err) {
      console.err(err);
    }
  };

  // Check Current user
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = currentUser.uid;
        console.log("uid:", uid);
        setIsLogOut(false);
      }
    });
  }, []);

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Movies",
      link: "/movie",
    },
    {
      name: "MyList",
      link: "/mylist",
    },
  ];
  return (
    <nav
      className={`flex h-[4rem] w-full items-center justify-between fixed z-[9999]  top-0 left-0 right-0 pl-[6%] pr-[6%] ${
        isScrolled ? "bg-black" : "bg-[rgba(0,0,0,0.2)]"
      } sm:`}
    >
      <div className="nav-left flex items-center justify-between gap-10">
        <div className="logo h-[50px] w-full">
          <img className="w-full h-full" src={logo} alt="logo" />
        </div>

        <ul className="flex items-center w-full gap-5 text-lg">
          {links.map(({name, link}) => {
            return (
              <li className="list-none" key={name}>
                <NavLink
                  className={({isActive}) => (isActive ? "text-primary" : "")}
                  style={{textDecoration: "none"}}
                  to={link}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {!isLogOut && (
        <div
          className={`nav-right flex items-center justify-between gap-5 text-[20px]`}
        >
          {/* <div
            className={`search cursor-pointer flex items-center rounded-sm ${
              showSearch
                ? "border border-1 border-solid border-[rgba(255,255,255,0.4)]"
                : ""
            }`}
          >
            <button
              className="pl-1"
              // onClick={() => setShowSearch(true)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch></FaSearch>
            </button>
            <input
              type="text"
              className={`text-white outline-none pl-2 bg-slate-800 transition-all ease-in-out delay-400  ${
                showSearch ? "visible w-[250px]" : "invisible w-0"
              }`}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div> */}
          <FaRegBell className="cursor-pointer "></FaRegBell>
          <div className="user relative group">
            <FaUser className="cursor-pointer "></FaUser>
            <ul className="flex flex-col items-center list w-[9rem] z-10 p-3 no-underline absolute top-10 -left-20  bg-[rgba(96,80,80,0.3)]  rounded-md invisible group-hover:visible transition-all ease-in-out before:content before:border-solid before:border-[0.8rem]  before:border-transparent before:border-b-[rgba(96,80,80,0.3)] before:absolute before:-translate-y-9 before:translate-x-2/3">
              <li className="mb-3 cursor-pointer hover:text-primary transition-all">
                Account
              </li>
              <li
                className="flex items-center justify-center w-full gap-2 cursor-pointer hover:text-primary transition-all"
                onClick={() => {
                  handleLogOut();
                }}
              >
                <FaSignOutAlt></FaSignOutAlt>
                <span className="">Log Out</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

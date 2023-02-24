import React from "react";
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-10 relative">
      <Navbar></Navbar>

      {/* <NavLink
        to="/"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="movie"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
      <NavLink
        to="login"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Login
      </NavLink>

      <NavLink
        to="register"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Register
      </NavLink> */}
    </header>
  );
};

export default Header;

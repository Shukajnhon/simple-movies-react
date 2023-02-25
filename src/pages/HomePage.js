import {onAuthStateChanged} from "firebase/auth";
import React, {Fragment, useEffect} from "react";
import {useNavigate} from "react-router-dom";
// import {tmdbAPI} from "../components/apiConfig/config.js";
import Banner from "../components/banner/Banner.js";
import MovieList from "../components/movie/MovieList.js";
// import useDebounce from "../hooks/useDebounce.js";
import {firebaseAuth} from "../utils/firebase-config.js";

const HomePage = () => {
  const navigate = useNavigate();
  // Check Current user
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = currentUser.uid;
        console.log("uid:", uid);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Fragment>
      <Banner></Banner>
      {/*Movies-layout Now Playing Section */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>

      {/*Movies-layout top rated Section */}
      <section className="movies-layout page-container pb-20 ">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>

      {/*Movies-layout popular Section */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Trending
        </h2>
        <MovieList type="upcoming"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;

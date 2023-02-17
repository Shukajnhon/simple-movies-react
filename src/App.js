import {Fragment} from "react";
import Banner from "./components/banner/Banner";
import MovieList from "./components/movie/MovieList";
import "swiper/css";

// import {NavLink} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-10">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      {/* Banner Section */}
      <Banner></Banner>

      {/*Movies-layout Now Playing Section */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>

      {/*Movies-layout top rated Section */}
      <section className="movies-layout page-container pb-20">
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
}

export default App;

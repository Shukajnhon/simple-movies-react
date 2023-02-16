import {Fragment} from "react";
import MovieList from "./components/movie/MovieList";

// import {NavLink} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-10">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      {/* Banner Section */}
      <section className="banner page-container h-[500px] mb-20">
        <div className="w-full h-full rounded-lg relative">
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]rounded-lg"></div>
          <img
            className="w-full h-full object-cover rounded-lg"
            src="https://i.ytimg.com/vi/qEVUtrk8_B4/maxresdefault.jpg"
            alt=""
          />
          <div className="absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-3">John Wick 4</h2>
            <div className="flex items-center gap-x-3 mb-8">
              <span className="py-2 px-4 border border-white rounded-md">
                Action
              </span>
              <span className="py-2 px-4 border border-white rounded-md">
                Crime
              </span>
              <span className="py-2 px-4 border border-white rounded-md">
                Drama
              </span>
            </div>
            <button className="py-3 px-6 rounded-lg text-white bg-primary font-medium">
              Watch Now
            </button>
          </div>
        </div>
      </section>

      {/*Movies-layout Now Playing Section */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>

      {/*Movies-layout  Top Rated Section */}
      {/* <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Top Rated
        </h2>

        <div className="movies-list grid grid-cols-4 gap-10 text-white ">
          <div className="movie-card rounded-lg p-3 bg-slate-800">
            <img
              className="w-full h-[250px] object-cover rounded-lg mb-5"
              src="https://i.ytimg.com/vi/qEVUtrk8_B4/maxresdefault.jpg"
              alt=""
            />
            <h3 className="text-xl font-bold mb-3">John Wick 4</h3>
            <div className="flex items-center justify-between text-sm opacity-60 mb-10">
              <span>2023</span>
              <span>8.0</span>
            </div>
            <button className="py-3 px-6 rounded-lg text-white bg-primary font-medium capitalize w-full">
              Watch now
            </button>
          </div>
        </div>
      </section> */}

      {/*Movies-layout  Top Trending Section */}
      {/* <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl mb-10 font-bold">
          Top Trending
        </h2>

        <div className="movies-list grid grid-cols-4 gap-10 text-white "></div>
      </section> */}
    </Fragment>
  );
}

export default App;

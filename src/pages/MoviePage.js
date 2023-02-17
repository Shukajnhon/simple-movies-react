import React from "react";
import useSWR from "swr";
import {fetcher} from "../config";
import {API_KEY} from "../utils/Constant";
import MovieCard from "../components/movie/MovieCard";
const MoviePage = () => {
  const {data} = useSWR(
    ` https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    fetcher
  );
  const movies = data.results || [];
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white"
            placeholder="Search movie"
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>;
          })}
      </div>
    </div>
  );
};

export default MoviePage;

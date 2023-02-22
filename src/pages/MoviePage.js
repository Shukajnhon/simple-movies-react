import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher, tmdbAPI} from "../components/apiConfig/config";
import MovieCard, {MovieCardSkeleton} from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import {v4} from "uuid";
const MoviePage = () => {
  // https://api.themoviedb.org/3/movie/popular?api_key=$ea38c7f2f57ff22a3e179a8eceaea2bb&language=en-US&page=1

  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  const [pages, setPages] = useState(1);
  const [, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  console.log("pageCount", pageCount);

  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMoviesList("popular", pages));

  const filterDebounce = useDebounce(filter, 1000);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPages(1);
  };
  // using UseEffect to listen when type input search, it changes URL
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMoviesSearch(filterDebounce, pages));
    } else {
      setUrl(tmdbAPI.getMoviesList("popular", pages));
    }
  }, [filterDebounce, pages]);
  const {data, error} = useSWR(url, fetcher);
  const itemsPerPage = 20;

  const movies = data?.results || [];

  const loading = !data && !error;
  console.log("dataMovies:", data);

  ////

  useEffect(() => {
    if (data || data?.total_results) {
      setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;

    setItemOffset(newOffset);
    setPages(event.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilterChange}
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto mt-5 animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => {
            return <MovieCardSkeleton key={v4()}></MovieCardSkeleton>;
          })}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>;
          })}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;

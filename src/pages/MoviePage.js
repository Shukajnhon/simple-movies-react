import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "../config";
import {API_KEY} from "../utils/Constant";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
const MoviePage = () => {
  // https://api.themoviedb.org/3/movie/popular?api_key=$ea38c7f2f57ff22a3e179a8eceaea2bb&language=en-US&page=1

  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  const [pages, setPages] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pages}`
  );

  const filterDebounce = useDebounce(filter, 1000);
  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };
  // using UseEffect to listen when type input search, it changes URL
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filterDebounce}&page=${pages}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pages}`
      );
    }
  }, [filterDebounce, pages]);
  const {data, error} = useSWR(url, fetcher);
  if (!data) return null;

  const movies = data?.results || [];

  const loading = !data && !error;

  const {total_pages} = data;
  console.log("total_pages:", total_pages);

  // Pagination

  const itemsPerPage = 20;

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const pageCount = Math.ceil(total_pages / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total_pages;

    setItemOffset(newOffset + 1);
    setPages(newOffset + 1);
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
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto mt-5 animate-spin"></div>
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
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>

      <div className="flex items-center justify-center mt-10 gap-x-2 hidden">
        <span className="cursor-pointer" onClick={() => setPages(pages - 1)}>
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>

        {new Array(pageCount).fill(0).map((item, index) => {
          return (
            <span
              onClick={() => setPages(index + 1)}
              className="cursor-pointer inline-block py-1 px-2 bg-primary rounded-sm"
            >
              {index + 1}
            </span>
          );
        })}

        <span className="cursor-pointer" onClick={() => setPages(pages + 1)}>
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
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;

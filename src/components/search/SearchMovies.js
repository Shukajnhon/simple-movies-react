// import React, {useEffect, useState} from "react";
// import useSWR from "swr";
// import {fetcher, tmdbAPI} from "../apiConfig/config.js";
// import MovieCard, {MovieCardSkeleton} from "../movie/MovieCard.js";
// import useDebounce from "../../hooks/useDebounce.js";
// import ReactPaginate from "react-paginate";
// import {v4} from "uuid";
// import {onAuthStateChanged} from "firebase/auth";
// import {firebaseAuth} from "../../utils/firebase-config.js";
// import {useNavigate} from "react-router-dom";
// const SearchMovies = () => {
//   // https://api.themoviedb.org/3/movie/popular?api_key=$ea38c7f2f57ff22a3e179a8eceaea2bb&language=en-US&page=1

//   // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
//   const [pages, setPages] = useState(1);
//   const [, setItemOffset] = useState(0);
//   const [pageCount, setPageCount] = useState(0);
//   console.log("pageCount", pageCount);
//   const navigate = useNavigate();

//   const [filter, setFilter] = useState("");
//   const [url, setUrl] = useState(tmdbAPI.getMoviesList("popular", pages));

//   const filterDebounce = useDebounce(filter, 1000);
//   // const handleFilterChange = (e) => {
//   //   setFilter(e.target.value);
//   //   setPages(1);
//   // };

//   // Check Current user
//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = currentUser.uid;
//       console.log("uid:", uid);
//     } else {
//       navigate("/login");
//     }
//   });
//   // using UseEffect to listen when type input search, it changes URL
//   useEffect(() => {
//     if (filterDebounce) {
//       setUrl(tmdbAPI.getMoviesSearch(filterDebounce, pages));
//     } else {
//       setUrl(tmdbAPI.getMoviesList("popular", pages));
//     }
//   }, [filterDebounce, pages]);
//   const {data, error} = useSWR(url, fetcher);
//   const itemsPerPage = 20;

//   const movies = data?.results || [];

//   const loading = !data && !error;
//   console.log("dataMovies:", data);

//   ////

//   useEffect(() => {
//     if (data || data?.total_results) {
//       setPageCount(Math.ceil(data.total_results / itemsPerPage));
//     }
//   }, [data, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % data.total_results;

//     setItemOffset(newOffset);
//     setPages(event.selected + 1);
//   };

//   return (
//     <div className="py-10 page-container">
//       {/* {loading && (
//         <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto mt-5 animate-spin"></div>
//       )} */}
//       {loading && (
//         <div className="grid grid-cols-4 gap-10">
//           {new Array(itemsPerPage).fill(0).map(() => {
//             return <MovieCardSkeleton key={v4()}></MovieCardSkeleton>;
//           })}
//         </div>
//       )}
//       <div className="grid grid-cols-4 gap-10">
//         {movies.length > 0 &&
//           movies.map((movie) => {
//             return <MovieCard key={movie.id} movie={movie}></MovieCard>;
//           })}
//       </div>

//       <div className="mt-10">
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="next >"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={4}
//           pageCount={pageCount}
//           previousLabel="< previous"
//           renderOnZeroPageCount={null}
//           className="pagination"
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchMovies;

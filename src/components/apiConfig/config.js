import {API_KEY, URL_MOVIE} from "../../utils/Constant.js";
// For normal RESTful APIs with JSON data
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
// `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filterDebounce}&page=${pages}`

// TMBD_API
const URL_MOVIE_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=";
export const tmdbAPI = {
  getMoviesList: (type, page = 1) => {
    return `${URL_MOVIE}${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
  },
  getMoviesDetail: (movieId) => {
    return `${URL_MOVIE}${movieId}?api_key=${API_KEY}&language=en-US`;
  },
  getMoviesMeta: (movieId, type) => {
    return `${URL_MOVIE}${movieId}/${type}?api_key=${API_KEY}&language=en-US`;
  },
  getMoviesSearch: (query, page) => {
    return `${URL_MOVIE_SEARCH}${API_KEY}&query=${query}&page=${page}`;
  },
};

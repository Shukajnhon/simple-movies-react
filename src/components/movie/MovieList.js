import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import useSWR from "swr";
import {fetcher, tmdbAPI} from "../apiConfig/config";
import MovieCard from "./MovieCard";

// https://api.themoviedb.org/3/movie/now_playing?api_key=ea38c7f2f57ff22a3e179a8eceaea2bb&language=en-US&page=1

const MovieList = ({type = "now_playing"}) => {
  // const [movies, setMovies] = useState([]);

  // Now Playing
  const {data} = useSWR(tmdbAPI.getMoviesList(type), fetcher);

  const movies = data?.results || [];
  // console.log("moviesFetching:", movies);

  // useEffect(() => {
  //   if (data) {
  //     setMovies(data.results);
  //   }
  // }, [data]);

  return (
    <div className="movies-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MovieList;

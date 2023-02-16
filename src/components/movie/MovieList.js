import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import useSWR from "swr";
import "swiper/scss";
import MovieCard from "./MovieCard";
import {fetcher} from "../../config";
import {API_KEY} from "../../utils/Constant";

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const {data, error, isLoading} = useSWR(
    ` https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
    fetcher
  );
  //   console.log("DataFetching:", data);
  useEffect(() => {
    if (data) {
      setMovies(data.results);
    }
  }, [data]);
  console.log("movies:", movies);

  return (
    <div className="movies-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieList;

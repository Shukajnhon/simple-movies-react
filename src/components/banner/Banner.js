import React from "react";
import useSWR from "swr";
import {Swiper, SwiperSlide} from "swiper/react";
import {API_KEY, URL_IMAGE_ORIGINAL} from "../../utils/Constant.js";
import Button from "../button/Button.js";
import {useNavigate} from "react-router-dom";
import {fetcher} from "../apiConfig/config.js";
const Banner = () => {
  const {data} = useSWR(
    ` https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    fetcher
  );

  const movies = data?.results || [];

  return (
    <section className="banner page-container h-[500px] mb-5 mb:mb-20 overflow-hidden z-10">
      <Swiper grabCursor="true" slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <BannerItem movie={movie}></BannerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

const BannerItem = ({movie}) => {
  //   console.log("MovieBanner:", movie);
  const {backdrop_path, title, id} = movie;

  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]rounded-lg"></div>
      <img
        className="object-cover object-top w-full h-full rounded-lg"
        src={`${URL_IMAGE_ORIGINAL}${backdrop_path}`}
        alt=""
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-3 font-bold text-md md:text-3xl">{title}</h2>
        <div className="flex items-center mb-8 text-xs gap-x-3 md:text-lg">
          <span className="px-1 py-1 border border-white rounded-md md:px-4 md:py-2">
            Action
          </span>
          <span className="px-1 py-1 border border-white rounded-md md:px-4 md:py-2">
            Crime
          </span>
          <span className="px-1 py-1 border border-white rounded-md md:px-4 md:py-2">
            Drama
          </span>
        </div>
        <Button
          className="px-2 py-2 text-sm md:text-lg "
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default Banner;

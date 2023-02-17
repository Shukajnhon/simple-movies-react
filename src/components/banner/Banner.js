import React from "react";
import useSWR from "swr";
import {Swiper, SwiperSlide} from "swiper/react";
import {fetcher} from "../../config";
import {API_KEY, URL_IMAGE_ORIGINAL} from "../../utils/Constant";
const Banner = () => {
  const {data} = useSWR(
    ` https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    fetcher
  );

  const movies = data?.results || [];

  return (
    <section className="banner page-container h-[500px] mb-20 overflow-hidden">
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
  const {backdrop_path, title} = movie;

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]rounded-lg"></div>
      <img
        className="w-full h-full object-cover rounded-lg object-top"
        src={`${URL_IMAGE_ORIGINAL}${backdrop_path}`}
        alt=""
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-3">{title}</h2>
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
  );
};

export default Banner;

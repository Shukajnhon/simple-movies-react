import React, {Fragment} from "react";
import {useParams} from "react-router-dom";
import useSWR from "swr";
import {fetcher} from "../config";
import {
  API_KEY,
  URL_IMAGE,
  URL_IMAGE_ORIGINAL,
  URL_MOVIE,
  URL_MOVIE_TRAILER,
} from "../utils/Constant";

const MovieDetailPage = () => {
  const {movieId} = useParams();
  // const movieId = params.movieId;
  const {data} = useSWR(
    `${URL_MOVIE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  const {backdrop_path, title, genres, overview} = data;
  // console.log(data);
  return (
    <Fragment>
      <div className="py-10">
        <div className="w-full h-[600px] relative">
          <div className="absolute inset-0 bg-black bg-opacity-60 overlay"></div>
          <div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${URL_IMAGE_ORIGINAL}${backdrop_path})`,
            }}
          ></div>
        </div>

        <div className="w-full max-w-[800px] h-[400px] mx-auto -mt-[200px] relative z-10 pb-10">
          <img
            src={`${URL_IMAGE_ORIGINAL}${backdrop_path}`}
            alt=""
            className="w-full h-full object-cover object-top rounded-xl"
          />
        </div>
        <h1 className="text-center text-3xl text-white font-bold mb-10 ">
          {title}
        </h1>
        {genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-5 mb-10">
            {genres.map((genre) => {
              return (
                <span
                  key={genre.id}
                  className="py-2 px-4 text-primary border border-primary rounded-md"
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
        )}

        <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
          {overview}
        </p>

        <MovieCredits></MovieCredits>
        {/* <video src={`${URL_MOVIE_TRAILER}Hj1vP05HGOg`}></video> */}

        <MovieVideo></MovieVideo>
      </div>
    </Fragment>
  );
};

// MovieCredits to get characters
const MovieCredits = () => {
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  const {movieId} = useParams();
  const {data} = useSWR(
    `${URL_MOVIE}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    fetcher
  );

  if (!data) return null;

  const {cast} = data;
  if (!cast || cast.length <= 0) return null;

  // console.log("cast: ", cast);
  // console.log("profile_path: ", profile_path);
  // console.log("characters: ", data);
  return (
    <>
      <h2 className="text-center text-4xl mb-10">CASTS</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="cast-item">
              <img
                src={`${URL_IMAGE}${item.profile_path}`}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl text-center">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

const MovieVideo = () => {
  const {movieId} = useParams();
  const {data} = useSWR(
    `${URL_MOVIE}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    fetcher
  );

  if (!data) return null;
  console.log(data);
  return (
    <div className="w-full h-[400px]">
      {/* <iframe src={`${URL_MOVIE_TRAILER}Hj1vP05HGOg`}></iframe> */}

      <iframe
        width="560"
        height="315"
        src={`${URL_MOVIE_TRAILER}9zvgGSTZlOY`}
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieDetailPage;

import React from "react";
import {useNavigate} from "react-router-dom";
import {URL_IMAGE} from "../../utils/Constant";

const MovieCard = ({movie}) => {
  const {
    title,
    vote_average,
    id,
    // genre_ids,
    // overview,
    backdrop_path,
    release_date,
  } = movie;
  // console.log(movie);

  const navigate = useNavigate();

  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full">
      <img
        className="w-full h-[250px] object-cover rounded-lg mb-5"
        src={`${URL_IMAGE}${backdrop_path}`}
        alt=""
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-60 mb-10">
          <span> {new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-3 px-6 rounded-lg text-white bg-primary font-medium capitalize w-full mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

import React from "react";
import {useNavigate} from "react-router-dom";
import {URL_IMAGE} from "../../utils/Constant.js";
import Button from "../button/Button.js";
import {withErrorBoundary} from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton.js";

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
    <div className="flex flex-col h-full p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        className="w-full h-[250px] object-cover rounded-lg mb-5"
        src={`${URL_IMAGE}${backdrop_path}`}
        alt=""
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 font-bold text-md md:text-xl">{title}</h3>
        <div className="flex items-center justify-between mb-2 text-sm md:mb-10 opacity-60">
          <span> {new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>

        <Button
          className=""
          full="false"
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch Now
        </Button>

        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="w-full px-6 py-3 mt-auto font-medium text-white capitalize rounded-lg bg-primary"
        >
          Watch now
        </button> */}
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg movie-card bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mt-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-sm font-bold md:text-xl">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-60">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="40px"
          radius="8px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

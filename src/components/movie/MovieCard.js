import React from "react";
import {useNavigate} from "react-router-dom";
import {URL_IMAGE} from "../../utils/Constant";
import Button from "../button/Button";
import {withErrorBoundary} from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

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

        <Button full="true" onClick={() => navigate(`/movie/${id}`)}>
          Watch Now
        </Button>

        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-3 px-6 rounded-lg text-white bg-primary font-medium capitalize w-full mt-auto"
        >
          Watch now
        </button> */}
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mt-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-60 mb-10">
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
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

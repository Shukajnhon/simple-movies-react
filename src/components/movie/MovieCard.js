import React from "react";

const MovieCard = () => {
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white">
      <img
        className="w-full h-[250px] object-cover rounded-lg mb-5"
        src="https://i.ytimg.com/vi/qEVUtrk8_B4/maxresdefault.jpg"
        alt=""
      />
      <h3 className="text-xl font-bold mb-3">John Wick 4</h3>
      <div className="flex items-center justify-between text-sm opacity-60 mb-10">
        <span>2023</span>
        <span>8.0</span>
      </div>
      <button className="py-3 px-6 rounded-lg text-white bg-primary font-medium capitalize w-full">
        Watch now
      </button>
    </div>
  );
};

export default MovieCard;

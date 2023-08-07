import React, { useState } from "react";
import MoviesWatchedList from "./MoviesWatchedList";
import RenderMoviesWatched from "./RenderMoviesWatched";

export default function MoviesWatched({
  avgRuntime,
  avgUserRating,
  avgImdbRating,
  tempWatchedData,
  watched,
  userRating,
  setUserRating,
  onRemoveMovie,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <MoviesWatchedList
            avgRuntime={avgRuntime}
            avgUserRating={avgUserRating}
            avgImdbRating={avgImdbRating}
            tempWatchedData={tempWatchedData}
            watched={watched}
          />
          <RenderMoviesWatched
            watched={watched}
            userRating={userRating}
            setUserRating={setUserRating}
            onRemoveMovie={onRemoveMovie}
          />
        </>
      )}
    </div>
  );
}

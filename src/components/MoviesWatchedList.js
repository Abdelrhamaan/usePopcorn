import React from "react";

export default function MoviesWatchedList({
  avgRuntime,
  avgUserRating,
  avgImdbRating,
  tempWatchedData,
  watched,
}) {
  return (
    <div>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{Math.floor(avgImdbRating)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{Math.floor(avgUserRating)}</span>
            {/* <span>{avgUserRating}</span> */}
          </p>
          <p>
            <span>⏳</span>
            <span>{Math.floor(avgRuntime)} min</span>
          </p>
        </div>
      </div>
    </div>
  );
}

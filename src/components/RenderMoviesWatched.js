import React, { useEffect } from "react";

export default function RenderMoviesWatched({
  watched,
  userRating,
  setUserRating,
  onRemoveMovie,
}) {
  return (
    <div>
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
              <button
                className="btn-delete"
                onClick={() => onRemoveMovie(movie.imdbID)}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

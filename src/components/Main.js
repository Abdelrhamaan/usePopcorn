import React, { useEffect, useState } from "react";
import Movies from "./Movies";
import MoviesWatched from "./MoviesWatched";
import MovieDetails from "./MovieDetails";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Main({
  movies,
  movieId,
  setMovieId,
  onSelectId,
  onRemoveSelectId,
}) {
  const [userRating, setUserRating] = useState("");
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){
    const stored = localStorage.getItem("watched")
    return JSON.parse(stored)
  });

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  function handleAddMovie(movie) {
    setWatched((watched) => [...watched, movie]);
    /*if we made it here we have to remove it from handleRemoveMovie    */
    // localStorage.setItem("watched",JSON.stringify((watched)=>[...watched,movie]))
  }
  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(function(){
    /*if we removed movie from ui it will be removed bcause 
    [watched] which mean data is synchronized with every change  */
    localStorage.setItem("watched",JSON.stringify(watched))
  },[watched])

  return (
    <div>
      <main className="main">
        <Movies movies={movies} onSelectId={onSelectId} />
        {movieId ? (
          <MovieDetails
            movieId={movieId}
            onRemoveSelectId={onRemoveSelectId}
            onAddMovie={handleAddMovie}
            userRating={userRating}
            setUserRating={setUserRating}
            watched={watched}
          />
        ) : (
          <>
            <MoviesWatched
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}
              // tempWatchedData={tempWatchedData}
              watched={watched}
              onAddMovie={handleAddMovie}
              onRemoveMovie={handleRemoveMovie}
              userRating={userRating}
              setUserRating={setUserRating}
            />
          </>
        )}
      </main>
    </div>
  );
}

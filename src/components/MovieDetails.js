import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "../Loader";

export default function MovieDetails({
  movieId,
  onRemoveSelectId,
  onAddMovie,
  userRating,
  setUserRating,
  watched,
}) {
  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const WatchedMovieRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;
  // console.log(isWatched);
  const KEY = "b5ec585e";
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const countRef = useRef(0);
  let count = 0;


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // ================================================
  // (/* eslint-disable */)  //---> prevent eslint error 
  // if (imdbRating > 8) [isTop,setIsTop] = useState(true)
  /* console error because hhoks in react are put in linked list
  so in the new render new hooc has been created and there is no link
  between hoocs in the new render . 
  1. useState                   useState
  2. useState                   useState
  3. useState                   useState
  4. useEffect                  useState*/
  
  // if (imdbRating > 8) [isTop,setIsTop] = useState(true)
  // this like this 
  // if (imdbRating > 8) return <p>greatest ever !</p>
  // ====================================================
  

  // ====================================================
  // const [isTop,setIsTop] = useState(imdbRating > 8)
  /* when the comp intial rendering imdbRating = undefined ---->false 
   and we didnt update it so it will stay false */
  // console.log(isTop); // false even imdbRating > 8
  // to fix it use useEffect 
  // useEffect(function(){
  //   setIsTop(imdbRating > 8)
  // },[imdbRating]) 


  // this piece of code work as upper
  // just do that without using useEffect
  // const isTop = imdbRating > 8
  // console.log(isTop); 
  // ======================================================

  // const[avgRating,setAvgRating] = useState(0)
  function addNewMovie() {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDescision:countRef.current,
      count
    };
    // localStorage.setItem("watched",(watched)=>JSON.stringify([...watched,newWatchedMovie]))
     onAddMovie(newWatchedMovie);
    onRemoveSelectId();
  
  // setAvgRating(Number(imdbRating));
  //   setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }


  useEffect(function(){
    /*to count how many times user rtake descision to rate the movie
    and not render it so used use ref 
    note ---> if used sample variable like count it will still 0 because 
    every time you rerender it updates value which is 0 but use ref save value 
    between rendering */
    if(userRating) countRef.current++;
    if(userRating)count++;
  },[userRating,count])


  useEffect(
    function () {
      function addEvent(e) {
        if (e.code === "Escape") {
          onRemoveSelectId();
          console.log("closed");
        }
      }
      document.addEventListener("keydown", addEvent);

      // to remove event listner from dom
      return function () {
        document.removeEventListener("keydown", addEvent);
      };
    },
    [onRemoveSelectId]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setError("");
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error("Error fetching the data");
          }
          setMovie(data);
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      // onRemoveSelectId();

      getMovieDetails();
    },
    [movieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
        // he will remeber title after cleaning up due to function clousre
        // wich means that func remmber var
        // console.log(`clean up movie ${title}`);
      };
    },
    [title]
  );
  return (
    <div class="box details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onRemoveSelectId}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating}IMDB rating
              </p>
            </div>
          </header>
          <section>
            {/* <p>{avgRating}</p> */}
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={25}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addNewMovie}>
                      +Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie before {WatchedMovieRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>directed by {director}</p>
          </section>
          {/* {movieId} */}
        </>
      )}
    </div>
  );
}

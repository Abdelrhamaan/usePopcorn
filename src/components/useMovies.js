import { useEffect, useState } from "react";

const KEY = "b5ec585e";
export default function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      // cleaning requests because we are fetching by name
      const controller = new AbortController();
      async function fetchMovies() {
        setError("");
        try {
          setIsLoading(true);
          const res = await fetch(
            ` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          // handle if connection failed after render page
          if (!res.ok) {
            throw new Error("something went wrong while fetching data ");
          }
          const data = await res.json();
          /* console.log(data); 
            handle if query dont match any thing*/
          if (data.Response === "False") {
            throw new Error("No matching for this movie");
          }

          setMovies(data.Search);
          // console.log(data.Search);
          setIsLoading(false);
          setError("");
          /*when you refresh comp movies will be an empty array beacuse 
          func is async and the function didnt happen yet but if you made 
          ctr+s it will give you array of movies */
          // console.log(movies);
        } catch (error) {
          // console.error(error.message);
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // to remove movie if there is no search
      //   handleCloseSelectedMovieId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}

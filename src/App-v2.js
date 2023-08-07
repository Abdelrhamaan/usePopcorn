import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import Logo from "./components/Logo";
import Results from "./components/Results";
import Loader from "./Loader";
import FetchingError from "./components/FetchingError";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
/* we define it out the component because 
we didnt want it to being declare every time component rendered */
const KEY = "b5ec585e";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState(null);

  function handleSelectedMovieId(id) {
    setMovieId((movieId) => (id === movieId ? null : id));
  }

  function handleCloseSelectedMovieId(id) {
    setMovieId(null);
    // document.title = "usePopcorn";
  }

  /* putting the func in use effect mean that i want the func happens
    after the comp painted to screen not when it being rendered 
    -------------------------------------------------------------
    side effect can be happens by (event handlers - use effect)
    event handlers vs use effect 
    event handlers ----> when event happens (onClick - onSubmit)
    use effect     ----> when comp first rerender 
    -------------------------------------------------------------
    the prefered way to make side effect is to use event handlers
    */

  useEffect(
    function () {
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
      handleCloseSelectedMovieId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  // useEffect(function(){
  //   fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=hurry`)
  // .then((res)=>res.json())
  // .then((data)=>setMovies(data.Search))
  // },[])

  /* set state in the render place will cause infinite loop of requests 
    because with every time you sent request you set data then render comp
    then fetch data....
 fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=hurry`)
  .then((res)=>res.json()).then((data)=>setMovies(data.Search))*/

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>
      {/*  only one of them will be true  */}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <Main
          tempMovieData={tempMovieData}
          movies={movies}
          movieId={movieId}
          setMovieId={setMovieId}
          onSelectId={handleSelectedMovieId}
          onRemoveSelectId={handleCloseSelectedMovieId}
        />
      )}
      {error && <FetchingError message={error} />}
    </>
  );
}

import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" mt-0 sm:mt-0 md:-mt-30 pl-12 relative z-30">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

          <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />

          <MovieList title={"Popular"} movies={movies.popularMovies} />

          <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />

          <MovieList
            title={"Upcoming Movies"}
            movies={movies.nowPlayingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;

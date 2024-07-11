import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../../utils/constants";
import { addPopularMovies } from "../../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  //Memoization starts here//
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  //we will make an API call here for our Now playing movie from TMDB //

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_Options
    );

    // Now this data will return us a Promise so we will use await to handle that promise and also in order to make our data readable we will convert the data into json. //
    const json = await data.json();
    console.log("checking for the movie API from TMDB", json.results);

    //pushing the list of 20 movies coming from TMDB of now playing movies inside the reducer function of our moviesSlice//
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;

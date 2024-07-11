import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../../utils/constants";
import { addNowPlayingMovies } from "../../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  //Memoization starts here//
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  //we will make an API call here for our Now playing movie from TMDB //

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_Options
    );

    // Now this data will return us a Promise so we will use await to handle that promise and also in order to make our data readable we will convert the data into json. //
    const json = await data.json();
    console.log("checking for the movie API from TMDB", json.results);

    //pushing the list of 20 movies coming from TMDB of now playing movies inside the reducer function of our moviesSlice//
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../../utils/constants";
import { addTrailerVideo } from "../../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //Memoization starts here//
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  //we will fetch trailer video here//
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_Options
    );
    //data will return a promise that's why we will do await below//

    const json = await data.json();
    console.log("checking video of movie", json.results);

    //we are only concerned with type-trailer, so for that we will apply filter in this json object//

    const filteredData = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    console.log("checking the trailer here", trailer);
    dispatch(addTrailerVideo(trailer));
  };

  //In order to run the data coming from API, we have to call that fucntion inside useEffect..//
  useEffect(() => {
    if (!trailerVideo) getMovieVideo();
  }, []);
};

export default useMovieTrailer;

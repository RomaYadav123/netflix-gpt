import { useSelector } from "react-redux";
import VideoTitle from "../components/VideoTitle";
import VideoBackground from "../components/VideoBackground";

const MainContainer = () => {
  //to get the data from the redux store i.e., appStore here  we will use useSelector to get the data from the store//
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  //this process is known as early return ; Here we are checking if the movies === null or !movies, then return from there itself ;;; As intially we ahve assigned our initialState as null..//
  if (!movies) return;

  const mainMovie = movies[0];
  console.log("checking what i got in my movie[0]", mainMovie);

  //extracting few details from this maionMovie//

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[60%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

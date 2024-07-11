import { useSelector } from "react-redux";
import useNowPlayingMovies from "../components/hooks/useNowPlayingMovies";
import usePopularMovies from "../components/hooks/usePopularMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import Header from "../components/Header";
import GptSearch from "../components/GptSearch";

const Browse = () => {
  //now here we want to update the view of our browse page according to the store i.e., if the showGptSearch = true then show the Gpt search page to th euser else not; so here we have to read the data from the store so we will use useSelector and will try to read as per their initialState values. Always remember for fetching data from the store we use {store.(appstore p jo naam h slice ka).initialState} ...//
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;

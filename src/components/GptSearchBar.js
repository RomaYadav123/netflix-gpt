import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { openai, fetchWithRetry } from "../utils/openai";
import { OPENAI_KEY } from "../utils/constants";
import { API_Options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const searchText = useRef(null);

  const langKey = useSelector((store) => store.config.lang);

  const searchMoviesTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    console.log("checking the ref values here", searchText.current.value);

    try {
      const gptQuery =
        "Act as a movie recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ".Only give me names of 5 movies , comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Titanic, Inscidious";

      const url = "https://api.openai.com/v1/chat/completions";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: gptQuery }],
        }),
      };

      const response = await fetchWithRetry(url, options);
      const gptResults = await response.json();

      console.log(gptResults.choices);

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      //for each gptMovies which will be an array of movies, i will search that movie's api on TMDB..//

      const promiseArray = gptMovies.map((movie) => searchMoviesTMDB(movie));
      //since map() is an async function so it will not give us the result directly; as it will first give me the promise & since the gptMovies is an array of movies so .map() will return us an array of promises.//

      //now in order to resolve these promises we will use a JS function promise.all() that will first await for the above promise to get resolved & post that it will execute..//

      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error while fetching GPT results:", error);
    }
  };

  return (
    <div className="pt-[80%]  md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 sm:mt-[30%] md:mt-0  bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

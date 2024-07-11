import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestions = () => {
  //subscribing to the store in order to read data from the store.//

  const gpt = useSelector((store) => store.gpt);

  const { movieNames, movieResults } = gpt;
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;

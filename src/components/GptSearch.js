import GptSearchBar from "../components/GptSearchBar";
import GptMovieSuggestions from "../components/GptMovieSuggestions";
import collage from "../components/images/movie-collage-wallpaper-preview.jpg";

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          src={collage}
          alt="movie-bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;

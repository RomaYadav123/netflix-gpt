import { FaPlay } from "react-icons/fa";
import { CgMoreVerticalO } from "react-icons/cg";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="  md:w-screen md:aspect-video md:pt-48  md:px-24 md:absolute md:z-20  md:text-white md:bg-gradient-to-r md:from-gray">
      <div className=" md:flex md:flex-col justify-start items-start">
        <h1 className="text-2xl sm:text-2xl md:text-6xl font-bold hidden md:hidden lg:inline">
          {title}
        </h1>
        <p className="sm:text-xs md:py-6 md:text-lg md:w-1/4 hidden md:hidden lg:inline-block">
          {overview}
        </p>
      </div>

      <div className="flex">
        <button className="bg-white hidden    text-black p-4 px-12 text-xl md:flex md:items-center  md:rounded-lg md:hover:bg-opacity-80">
          <FaPlay className="mr-4" />
          Play
        </button>
        <button className="bg-gray-500 hidden   mx-2 text-white p-4 px-12 text-xl md:flex md:items-center md:bg-opacity-50 md:rounded-lg">
          <CgMoreVerticalO className="mr-4" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../components/images/227_Netflix_logo-512.webp";
import smileyLogo from "./images/smiley-logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        //now we will update our store here by dispatching an action //
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    console.log("gpt search btn clicked start");
    //here we want to toggle from gpt search button to the gpt search page when being clicked, for that we will dispatch an action here//
    dispatch(toggleGptSearchView());
    console.log("gpt search btn clicked end");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between flex-col md:flex-row">
      <img className="w-44 mx-auto sm:mx-0 md:mx-0" src={logo} alt="logo" />
      {user && (
        <div className="flex items-center">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 m-2 bg-purple-800 text-white font-bold rounded-lg"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img className="w-14 h-14 rounded-full" src={smileyLogo} />
          <button
            onClick={handleSignOut}
            className="font-bold text-lg text-white"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

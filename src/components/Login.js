import { useState, useRef } from "react";
import Header from "../components/Header";
import collage from "../components/images/movie-collage-wallpaper-preview.jpg";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { photoUrl } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef("");

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
      // name.current.value
    );

    setErrorMessage(message);

    if (message === null) {
      //write our sign in/sign up logic for creating that new user into our firebase

      if (!isSignInForm) {
        // write your sign up logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
          // name.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("checking for login details here", user);
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: photoUrl,
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName, photoURL } = auth.currentUser;

                //now we will update our store here by dispatching an action //
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                // An error occurred
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        // write your sign in logic here
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src={collage}
          alt="movie-bg"
          className="object-cover w-full h-full"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black bg-opacity-80 text-white rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* this means when isSignInForm is false that means it is registeration page, then show this field.. */}
        {!isSignInForm && (
          <input
            // ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-red-600 font-bold text-lg py-2"> {errorMessage} </p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New to Netflix? Sign Up Now"
            : "Already Registered ! Please Sign In.."}
        </p>
      </form>
    </div>
  );
};

export default Login;

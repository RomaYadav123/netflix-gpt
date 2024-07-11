// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2-rQX5yRbOFQxvYu-ui29euZ6YIicuso",
  authDomain: "netflixgpt-371ea.firebaseapp.com",
  projectId: "netflixgpt-371ea",
  storageBucket: "netflixgpt-371ea.appspot.com",
  messagingSenderId: "871779110078",
  appId: "1:871779110078:web:69ef71b6f168ccc70122ef",
  measurementId: "G-M2W2GW4TLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// in order to use any API we need this, so defining it here at the central place
export const auth = getAuth();

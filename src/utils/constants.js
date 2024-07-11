export const photoUrl =
  "F:Ubuntu\netflix-gptsrccomponentsimagesRoma_Photo(b&w).jpg";

export const API_Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWMwOTFhNGQ4YTBkNDcyYjM1N2Q5NmFiMmU5M2RiZSIsIm5iZiI6MTcxOTgyMjg4OS4xNzEwMzYsInN1YiI6IjY2ODI2NzdhMzFhNTEzODdhMmJmNThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2pqe9_52k7EFkxyaEyn45QR3t-DlhYiUm-O2kzXG1w",
  },
};

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

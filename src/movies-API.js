import axios from "axios";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmVmZmRmMTMyNWRkODEzMzAzNzBiOGE4ZGRiNGMwNiIsIm5iZiI6MTcyMTU1ODkzNy41NzEyODYsInN1YiI6IjY2OWNlNTIyOWMwMWJkMzYwN2NkNzdjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6oE062po8wuvwpyczAEZ7Xt62wOHgPAR1V_yWB_ofw";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const getProductsApi = async () => {
  const { data } = await axios.get("trending/movie/week", options);
  return data;
};

export const getMoviesId = async (moviesId) => {
  const { data } = await axios.get(`movie/${moviesId}`, options);
  return data;
};

export const getMovieCast = async (moviesId) => {
  const { data } = await axios.get(`movie/${moviesId}/credits`, options);
  return data.cast;
};

export const getMovieReviews = async (moviesId) => {
  const { data } = await axios.get(`movie/${moviesId}/reviews`, options);
  return data.results;
};

export const getSearch = async (query) => {
  const { data } = await axios.get(`search/movie`, {
    params: { query },
    ...options,
  });
  return data.results;
};

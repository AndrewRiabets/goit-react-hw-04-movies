import axios from "axios";

const baseApi = "https://api.themoviedb.org/3/";
const myApiKey = "c6dcb15d68a833d53abd0f366d1adcd7";
const paramsPopular = "trending/movie/day";
const URLPopular = `${baseApi}${paramsPopular}?api_key=${myApiKey}&language=en-US`;

export function popularMoviesAPI() {
  return axios.get(URLPopular).then((r) => r.data.results);
}

export function moreInfoAPI(movie_id) {
  return axios
    .get(`${baseApi}movie/${movie_id}?api_key=${myApiKey}`)
    .then((r) => r.data);
}

export function castAPI(movie_id) {
  return axios
    .get(`${baseApi}movie/${movie_id}/credits?api_key=${myApiKey}&per_page=5`)
    .then((r) => r.data.cast);
}

export function reviewsAPI(movie_id) {
  return axios
    .get(`${baseApi}movie/${movie_id}/reviews?api_key=${myApiKey}&per_page=5`)
    .then((r) => r.data);
}

export function moreMoviesFromUserQuery(query) {
  return axios
    .get(
      `${baseApi}search/movie?api_key=${myApiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then((r) => r.data.results);
}

const BASE_URL = process.env.TMDB_BASE_ROUTE;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const MOVIE_POSTER_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export const fetchPopularMoviesUrl = (page: string = "1") =>
  `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

export const searchMoviesUrl = (movieName: string, page: string = "1") =>
  `${BASE_URL}/search/movie?query=${movieName}&api_key=${TMDB_API_KEY}&page=${page}`;

export const fetchMovieDetailsUrl = (movieId: number) =>
  `${BASE_URL}/movie/${movieId}?append_to_response=credits&api_key=${TMDB_API_KEY}`;

export const moviePosterUrl = (path: string) =>
  `${MOVIE_POSTER_BASE_URL}${path}`;

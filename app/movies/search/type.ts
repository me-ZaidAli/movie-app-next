import { MovieCardType } from "components/type";

export type SearchMoviesResponse = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Array<MovieCardType>;
};

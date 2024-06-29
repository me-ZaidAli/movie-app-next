import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";

import { searchMoviesUrl, fetchPopularMoviesUrl } from "urls";
import MovieList from "components/MovieList";

import { SearchMoviesResponse } from "./type";
import SearchMovieForm from "./SearchMovieForm";

const searchMovies = async (movieName: string, page: string) => {
  const res = await fetch(searchMoviesUrl(movieName, page));

  if (!res.ok) {
    throw new Error("Couldn't search movies ");
  }

  return res.json();
};

const fetchPopularMovies = async (page: string) => {
  const res = await fetch(fetchPopularMoviesUrl(page));

  if (!res.ok) {
    throw new Error("Couldn't search popular movies ");
  }

  return res.json();
};

const SearchMovie = async ({
  searchParams: { query, page },
}: {
  searchParams: { query: string; page: string };
}) => {
  const session = await getServerSession();
  if (!session) redirect("/api/auth/signin");

  const { results: movies, totalPages }: SearchMoviesResponse = camelcaseKeys(
    await searchMovies(query, page),
    {
      deep: true,
    }
  );

  const {
    results: popularMovies,
    totalPages: totalPopularMoviesPages,
  }: SearchMoviesResponse = camelcaseKeys(await fetchPopularMovies(page), {
    deep: true,
  });

  return (
    <>
      <SearchMovieForm />
      <h4 className="text-3xl font-bold mt-10 mb-5">
        {query ? "Search Results" : "Popular Movies"}
      </h4>
      <MovieList
        movies={query ? movies : popularMovies}
        totalPages={query ? totalPages : totalPopularMoviesPages}
      />
    </>
  );
};

export default SearchMovie;

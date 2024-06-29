import Pagination from "./pagination";
import MovieCard from "./MovieCard";
import { MovieCardType } from "./type";

type MovieListProps = {
  movies: Array<MovieCardType>;
  totalPages: number;
};

const MovieList = ({ movies, totalPages }: MovieListProps) => {
  return (
    <>
      {movies.length ? (
        <div className="flex flex-col flex-1 justify-between gap-y-10">
          <div className="flex flex-row justify-start flex-wrap gap-x-10 gap-y-10">
            {movies?.map(({ id, title, releaseDate, posterPath }) => (
              <MovieCard
                key={id}
                id={id}
                title={title}
                releaseDate={releaseDate}
                posterUrl={posterPath}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-row justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-row min-h-96 justify-center items-center">
          <h4 className="text-2xl">No movies found!</h4>
        </div>
      )}
    </>
  );
};

export default MovieList;

import { Prisma } from "@prisma/client";

import { PAGE_SIZE } from "./contants";

export const paginateFetchWatchlistResults = (
  watchlistItems: Array<Prisma.$WatchlistPayload["scalars"]>,
  watchlistItemsCount: number,
  pageNo: number
) => ({
  results: watchlistItems,
  page: pageNo,
  totalPages:
    watchlistItemsCount < PAGE_SIZE
      ? 1
      : Math.ceil(watchlistItemsCount / PAGE_SIZE),
});

export const transformToMovies = (
  watchlistItems: Array<Prisma.$WatchlistPayload["scalars"]>
) =>
  watchlistItems.map((watchlistItem) => ({
    id: watchlistItem.movieId,
    title: watchlistItem.movieName,
    releaseDate: watchlistItem.movieReleaseDate,
    posterPath: watchlistItem.moviePosterImage,
  }));

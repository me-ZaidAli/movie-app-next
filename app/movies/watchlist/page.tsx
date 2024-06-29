import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

import MovieList from "components/MovieList";

import { PAGE_SIZE } from "./contants";
import { paginateFetchWatchlistResults, transformToMovies } from "./util";

const fetchWatchlist = async (userEmail: string, pageNo: number) => {
  const prismaClient = new PrismaClient();

  try {
    const watchlistItems = await prismaClient.watchlist.findMany({
      skip: (pageNo - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        userEmail,
      },
    });

    const watchlistItemsCount = await prismaClient.watchlist.count({
      where: {
        userEmail,
      },
    });

    return paginateFetchWatchlistResults(
      watchlistItems,
      watchlistItemsCount,
      pageNo
    );
  } catch (error) {
    throw new Error("Couldn't fetch watchlisted movies");
  }
};

const Watchlist = async ({
  searchParams: { page },
}: {
  searchParams: { query: string; page: string };
}) => {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const { results: watchlistItems, totalPages } = await fetchWatchlist(
    session.user.email,
    +page || 1
  );

  const movies = transformToMovies(watchlistItems);

  return (
    <div className="flex flex-col h-full w-full">
      <h4 className="text-4xl font-bold mb-10"> Watchlist</h4>
      <MovieList movies={movies} totalPages={totalPages} />
    </div>
  );
};

export default Watchlist;

"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

import { MovieDetail } from "./type";

export const alterWatchlist = async (
  userEmail: string,
  movieDetail: MovieDetail,
  form: FormData
) => {
  const watchlistItemId = form.get("isWatchlisted");

  if (!+watchlistItemId!) addToWatchlist(userEmail, movieDetail);
  else removeFromWatchlist(watchlistItemId);

  revalidatePath(`/movies/${movieDetail.id}`);
};

const addToWatchlist = async (userEmail: string, movieDetail: MovieDetail) => {
  const prismaClient = new PrismaClient();

  try {
    await prismaClient.watchlist.create({
      data: {
        userEmail,
        movieId: movieDetail.id,
        movieName: movieDetail.title,
        movieReleaseDate: movieDetail.releaseDate,
        moviePosterImage: movieDetail.posterPath,
      },
    });
  } catch (error) {
    throw new Error("Couldn't add movie to watchlist");
  }
};

const removeFromWatchlist = async (
  watchlistItemId: FormDataEntryValue | null
) => {
  const prismaClient = new PrismaClient();

  try {
    await prismaClient.watchlist.delete({
      where: {
        id: +watchlistItemId!,
      },
    });
  } catch (error) {
    throw new Error("Couldn't remove movie from watchlist");
  }
};

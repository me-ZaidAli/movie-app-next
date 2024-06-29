"use server";

import { redirect } from "next/navigation";

export async function setMoviePage(
  pathname: string,
  page: number,
  query?: string
) {
  redirect(`${pathname}?page=${page}${query ? `&query=${query}` : ""}`);
}

export async function redirectToMovieDetail(movieId: number) {
  redirect(`/movies/${movieId}`);
}

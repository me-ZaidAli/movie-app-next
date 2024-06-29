import { Image } from "@nextui-org/image";
import camelcaseKeys from "camelcase-keys";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/button";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Progress } from "@nextui-org/progress";

import { HeartIcon } from "components/icons";
import { fetchMovieDetailsUrl, moviePosterUrl } from "urls";

import { MovieDetail } from "./type";
import { alterWatchlist } from "./actions";
import { filterCrewMembers, hourMinuteFormat } from "./util";

const fetchMovieDetails = async (movieId: number) => {
  const res = await fetch(fetchMovieDetailsUrl(movieId));

  if (!res.ok) {
    throw new Error("Failed to movie details");
  }

  return res.json();
};

export const isWatchlisted = async (movieId: number, userEmail: string) => {
  const prismaClient = new PrismaClient();

  try {
    const watchlistedMovie = await prismaClient.watchlist.findFirst({
      where: {
        movieId,
        userEmail,
      },
    });
    return watchlistedMovie?.id || null;
  } catch (error) {
    throw new Error("Failed to confirm movie's watchlist status");
  }
};

export default async function MovieDetail({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const movieDetail: MovieDetail = camelcaseKeys(
    await fetchMovieDetails(+movieId),
    {
      deep: true,
    }
  );

  const executiveCrew = filterCrewMembers(movieDetail.credits.crew, [
    "Producer",
    "Director",
    "Writer",
  ]);

  const watchlistedMovieId = await isWatchlisted(+movieId, session.user.email);

  const addMovieToWatchlist = alterWatchlist.bind(
    null,
    session.user.email,
    movieDetail
  );

  return (
    <div className="flex flex-row flex-start">
      <div className="w-3/12 pl-12">
        <Image
          alt="Movie poster"
          className="object-cover rounded-xl"
          src={moviePosterUrl(movieDetail.posterPath)}
          fallbackSrc="/placeholder.png"
          width={300}
          height={350}
        />
      </div>

      <div className="w-9/12 gap-y-2">
        <div className="flex flex-col">
          <div className="mb-5">
            <h1 className="font-bold text-4xl pl-0">{movieDetail.title}</h1>
            <small className="text-small font-light">
              {`${movieDetail.releaseDate}  .  ${
                movieDetail.genres[0].name
              }  .  ${hourMinuteFormat(+movieDetail.runtime)}`}
            </small>
          </div>

          <div className="flex flex-row gap-x-4 mb-5">
            <Progress
              showValueLabel
              className="font-bold"
              value={movieDetail.voteAverage * 10}
              color="primary"
              aria-label="User score"
              label="User Score"
            />
            <form action={addMovieToWatchlist}>
              <input
                type="hidden"
                id="custId"
                name="isWatchlisted"
                value={watchlistedMovieId || 0}
              ></input>
              <Button
                isIconOnly
                className="mt-1"
                variant="ghost"
                aria-label="watchlist"
                type="submit"
              >
                <HeartIcon filled={!!watchlistedMovieId} fill="red" />
              </Button>
            </form>
          </div>
        </div>
        <div>
          <h4 className="text-3xl font-bold ">Overview</h4>
          <p className="text-m my-4">{movieDetail.overview}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-x-20 gap-y-6">
          {executiveCrew.map((crew) => (
            <div key={crew.id}>
              <h4 className="text-medium font-bold">{crew.name}</h4>
              <p className="text-small">{crew.job}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface MovieDetail {
  id: number;
  title: string;
  voteAverage: number;
  releaseDate: string;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  runtime: number;
  posterPath: string;
  credits: { crew: Array<CrewMember> };
}

export interface CrewMember {
  id: number;
  name: string;
  job: CrewJob;
}

export type CrewJob = "Producer" | "Writer" | "Director";

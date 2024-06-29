"use client";

import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

import { moviePosterUrl } from "urls";

import { redirectToMovieDetail } from "./actions";

type Props = {
  id: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
};

const MovieCard = ({ id, posterUrl, releaseDate, title }: Props) => {
  return (
    <Card
      isPressable
      id={id.toString()}
      className="py-2 w-64"
      onPress={() => {
        redirectToMovieDetail(id);
      }}
    >
      <CardHeader className="pb-0 pt-1 aspect-square">
        <Image
          alt="Movie poster"
          className="object-cover rounded-xl aspect-1/1.5"
          src={moviePosterUrl(posterUrl)}
          fallbackSrc="/placeholder.png"
          width={230}
          height={200}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large truncate ...">{title}</h4>
        <small className="text-default-500">{releaseDate}</small>
      </CardBody>
    </Card>
  );
};

export default MovieCard;

"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { SearchIcon } from "components/icons";

const SearchMovieForm = () => {
  const [movieName, setMovieName] = useState("");
  
  const router = useRouter();

  const handleSearchClick = () => {
    router.push(`/movies/search?query=${movieName}`);
  };

  return (
    // <form action={searchMovies} className="w-full mb-5 pr-20">
    <div className="flex flex-row justify-start gap-x-5">
      <Input
        name="movieName"
        classNames={{
          base: "max-w-screen-2xl h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
        placeholder="Search for movie..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="text"
      />
      <Button color="primary" onPress={handleSearchClick}>
        Search
      </Button>
    </div>
    // </form>
  );
};

export default SearchMovieForm;

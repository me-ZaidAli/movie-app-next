"use client";

import { Button } from "@nextui-org/button";

const Error = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="flex flex-col gap-y-5">
        <h4 className="text-2xl">Something went wrong!</h4>
        <Button color="primary" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default Error;

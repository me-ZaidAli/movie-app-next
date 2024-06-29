"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Pagination as NextuiPagination } from "@nextui-org/pagination";

import { setMoviePage } from "./actions";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const query = searchParams.get("query")?.replace(" ", "+");

  return (
    <NextuiPagination
      total={Math.min(totalPages, 20)}
      initialPage={1}
      page={+page!}
      onChange={(page: number) => {
        setMoviePage(pathname, page, query);
      }}
    />
  );
};

export default Pagination;

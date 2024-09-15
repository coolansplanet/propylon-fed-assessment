import { useState, useEffect } from "react";
import useApi from "./useApi";
import type { Bill } from "@/types/bill";

const useMockFavourites = () => {
  const api = useApi();
  const { mutateAsync: post, isPending: postIsPending } = api.favourites.post();
  const { mutateAsync: remove, isPending: removeIsPending } =
    api.favourites.delete();

  const [uriFavourites, setUriFavourites] = useState<string[]>([]);

  const getUriFavourites = () => {
    const stringifiedFavourites = localStorage.getItem("favourites") || "[]";
    return JSON.parse(stringifiedFavourites).map(
      (oneFavourite: Bill) => oneFavourite.bill.uri
    );
  };

  const isFavourite = (uri: string) => uriFavourites.includes(uri);

  useEffect(() => {
    setUriFavourites(getUriFavourites());
  }, []);

  const toggleFromFavourites = (oneBill: Bill) => {
    isFavourite(oneBill.bill.uri)
      ? remove(oneBill.bill.uri)
          .then(() => {
            setUriFavourites(getUriFavourites());
          })
          .catch((e) => console.error(e))
      : post(oneBill)
          .then(() => {
            setUriFavourites(getUriFavourites());
          })
          .catch((e) => console.error(e));
  };
  return {
    isFavourite,
    toggleFromFavourites,
    isPending: postIsPending || removeIsPending,
  };
};

export default useMockFavourites;

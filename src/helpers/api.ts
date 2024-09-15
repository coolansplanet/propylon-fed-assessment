import axios from "axios";
import { apiUrl, table } from "@/config";
import type { Bill, Params } from "@/types/bill";

export const legislation = {
  get: ({ page, rowsPerPage, bill_status }: Params) => {
    const filters = {} as Params;
    bill_status !== "none" && (filters.bill_status = bill_status);
    return axios.get(apiUrl.legislation, {
      params: { limit: rowsPerPage, skip: page * rowsPerPage, ...filters },
    });
  },
};

const getMockFavourites = () => {
  const stringifiedFavourites = localStorage.getItem("favourites") || "[]";
  return JSON.parse(stringifiedFavourites);
};
const saveMockFavourites = (favourites: Bill) => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

export const favourites = {
  get: ({
    page = 0,
    rowsPerPage = table.rowsPerPage.default,
    bill_status = "none",
  }) => {
    const location = page * rowsPerPage;

    const promise = new Promise((res) => {
      const favourites = getMockFavourites();
      const favouritesFiltered =
        bill_status === "none"
          ? favourites
          : favourites.filter(
              (oneFav: Bill) => oneFav.bill.status === bill_status
            );
      const data = {
        head: {
          counts: {
            billCount: favouritesFiltered.length,
            resultCount: favouritesFiltered.length,
          },
        },
        results: favouritesFiltered.slice(location, location + rowsPerPage),
      };
      res({ data });
    });
    return promise;
  },
  post: (oneBill: Bill) => {
    const promise = new Promise((res) => {
      const favourites = getMockFavourites();
      favourites.push(oneBill);
      saveMockFavourites(favourites);
      res("ok");
    });
    return promise;
  },
  delete: (id: string) => {
    const promise = new Promise((res) => {
      const favourites = getMockFavourites();
      const index = favourites.findIndex(
        (oneFav: Bill) => oneFav.bill.uri === id
      );
      favourites.splice(index, 1);
      saveMockFavourites(favourites);
      res("ok");
    });
    return promise;
  },
};

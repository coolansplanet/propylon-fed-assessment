import { useSearchParams } from "react-router-dom";
import { table, filters } from "@/config";
import type { Params } from "./useTableParams.types";

const useTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "0");
  const rowsPerPage = parseInt(
    searchParams.get("rowsPerPage") || table.rowsPerPage.default.toString()
  );

  const params = { page, rowsPerPage } as Params;
  filters.forEach(({ name }) => {
    // @ts-expect-error ts is not accepting "as keyof Params" as valid
    params[name] = searchParams.get(name);
  });

  const updateParams = (paramUpdate: Params) => {
    setSearchParams({ ...params, ...paramUpdate } as URLSearchParams);
  };

  return { ...params, updateParams };
};

export default useTableParams;

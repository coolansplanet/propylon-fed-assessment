import Table from "@/components/Table";
import Typography from "@mui/material/Typography";
import useTableParams from "@/helpers/useTableParams";
import useApi from "@/helpers/useApi";
import { pages } from "@/config";
import type { DataResponse } from "@/types/bill";

const Favourites = () => {
  const { page = 0, rowsPerPage = 0, bill_status = "" } = useTableParams();

  const api = useApi();

  const { data, isFetched, isFetching, isError, error } = api.favourites.get({
    page,
    rowsPerPage,
    bill_status,
  });

  const {
    data: { head, results: rows = [] },
  } = (data || { data: {} }) as DataResponse;
  return (
    <>
      <Typography variant="h1" gutterBottom align="center">
        {pages.favourites.label}
      </Typography>
      <Table {...{ head, rows, isFetched, isFetching, isError, error }} />
    </>
  );
};

export default Favourites;

import Table from "@/components/Table";
import Typography, { TypographyProps } from "@mui/material/Typography";
import useTableParams from "@/helpers/useTableParams";
import useApi from "@/helpers/useApi";
import { title } from "@/config";
import type { DataResponse } from "@/types/bill";

const Home = () => {
  const { text, ...textProps } = title;
  const { page = 0, rowsPerPage = 0, bill_status = "" } = useTableParams();

  const api = useApi();

  const { data, isFetched, isFetching, isError, error } = api.legislation.get({
    page,
    rowsPerPage,
    bill_status,
  });

  const {
    data: { head, results: rows = [] },
  } = (data || { data: {} }) as DataResponse;

  return (
    <>
      <Typography {...(textProps as TypographyProps)}>{text}</Typography>
      <Table {...{ head, rows, isFetched, isFetching, isError, error }} />
    </>
  );
};

export default Home;

import React from "react";
import FilterGroup from "./FilterGroup";
import TableMui from "@mui/material/Table";
import TitleModal from "./TitleModal";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Body from "./Body";
import Footer from "./Footer";
import Head from "./Head";
import Typography from "@mui/material/Typography";
import { table } from "@/config";
import type { Props } from "./Table.types";

const Table: React.FC<Props> = ({
  head,
  rows,
  isFetched,
  isFetching,
  isError,
  error,
}) => {
  return (
    <>
      <FilterGroup disabled={isFetching} />
      {isFetching || rows.length ? (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1000, marginBottom: 10 }}
        >
          <TableMui
            aria-label={
              isFetched
                ? table["aria-label"].whenLoaded
                : table["aria-label"].whenLoading
            }
          >
            <Head isFetched={isFetched} />
            <Body {...{ rows, isFetching }} />
            <Footer
              size={head?.counts?.billCount || 0}
              {...{ isFetching, isFetched }}
            />
          </TableMui>

          <TitleModal />
        </TableContainer>
      ) : (
        <Typography variant="h5">
          {isError
            ? error?.message
            : isFetched && !rows.length
              ? "No records to show"
              : "There was a problem with the request"}
        </Typography>
      )}
    </>
  );
};

export default Table;

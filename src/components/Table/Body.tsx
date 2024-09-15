import React from "react";
import TableBody from "@mui/material/TableBody";
import LoadingBody from "./LoadingBody";
import PopulatedBody from "./PopulatedBody";
import useTableParams from "@/helpers/useTableParams";
import type { Props } from "./Body.types";

const Body: React.FC<Props> = ({ isFetching, rows }) => {
  const { rowsPerPage } = useTableParams();
  return (
    <TableBody>
      {isFetching ? (
        <LoadingBody rowsPerPage={rowsPerPage as number} />
      ) : (
        <PopulatedBody rows={rows} />
      )}
    </TableBody>
  );
};

export default Body;

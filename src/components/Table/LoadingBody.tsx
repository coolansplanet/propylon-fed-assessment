import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { table } from "@/config";
import type { Props } from "./LoadingBody.types";

const LoadingBody: React.FC<Props> = ({ rowsPerPage }) => {
  const rows = [];

  for (let index = 0; index < rowsPerPage; index++) {
    rows.push(index);
  }

  return (
    <>
      {rows.map((oneRow) => {
        return (
          <TableRow key={oneRow}>
            {table.columnsOrder.map((oneColumnName) => {
              return (
                // @ts-expect-error ts is not accepting any "as keyof {{type}}" as valid
                <TableCell key={oneColumnName} {...table.cells[oneColumnName]}>
                  <Skeleton animation="wave" />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export default LoadingBody;

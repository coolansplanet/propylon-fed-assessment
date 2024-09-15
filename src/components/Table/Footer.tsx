import React from "react";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import useTableParams from "@/helpers/useTableParams";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import { table } from "@/config";
import type { Props } from "./Footer.types";

const Footer: React.FC<Props> = ({ size, isFetching, isFetched }) => {
  const { page, rowsPerPage, updateParams } = useTableParams();

  const onPageChange = (e: unknown, newPage: number) => {
    updateParams({ page: newPage });
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ page: 0, rowsPerPage: parseInt(e.target.value, 10) });
  };

  return (
    <TableFooter sx={{ backgroundColor: "orange" }}>
      <TableRow>
        {isFetching && (
          <TableCell colSpan={table.columnsOrder.length}>
            <Skeleton animation="wave" sx={{ height: 25 }} />
          </TableCell>
        )}
        {isFetched && (
          <TablePagination
            disabled={!isFetched}
            rowsPerPageOptions={table.rowsPerPage.options}
            rowsPerPage={rowsPerPage as number}
            page={page as number}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            count={size}
            showFirstButton
            showLastButton
          />
        )}
      </TableRow>
    </TableFooter>
  );
};
export default Footer;

import React, { useState, useEffect } from "react";
import type { Props, TableHeadersConfig } from "./Head.types";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { table } from "@/config";
import Skeleton from "@mui/material/Skeleton";

const Head: React.FC<Props> = ({ isFetched }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isFetched && loading && setLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  return (
    <TableHead sx={{ backgroundColor: "orange", color: "white" }}>
      <TableRow>
        {table.columnsOrder.map((oneColumnName) => {
          const { text, ...headerProps } =
            table.headers[oneColumnName as keyof TableHeadersConfig];
          return (
            <TableCell
              key={oneColumnName}
              sx={{ color: "white", fontWeight: 700 }}
              {...(headerProps as TableCellProps)}
            >
              {loading ? <Skeleton animation="wave" /> : text}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default Head;

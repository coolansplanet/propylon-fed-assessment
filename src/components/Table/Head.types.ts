import { TableCellProps } from "@mui/material/TableCell";

export interface Props {
  isFetched: boolean;
}

export type SingleTableHeader = {
  text: string;
};

export type TableHeadersConfig = {
  save: SingleTableHeader & TableCellProps;
  billNo: SingleTableHeader & TableCellProps;
  billType: SingleTableHeader & TableCellProps;
  status: SingleTableHeader & TableCellProps;
  sponsors: SingleTableHeader & TableCellProps;
  titles: SingleTableHeader & TableCellProps;
};

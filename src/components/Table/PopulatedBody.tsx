import React from "react";
import InfoButton from "./InfoButton";
import FavouriteButton from "./FavouriteButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { table } from "@/config";
import { list } from "@/helpers/format";
import type { Props, BillInner, Sponsor } from "./PopulatedBody.types";

const PopulatedBody: React.FC<Props> = ({ rows = [] }) => {
  const generateSponsorList = (fieldValue: Sponsor[]) =>
    list.format(
      fieldValue.map(({ sponsor }: Sponsor) => {
        return sponsor.as.showAs || sponsor.by.showAs || "unknown";
      })
    );

  return (
    <>
      {rows.map((wholeBill, index) => {
        const { bill } = wholeBill;
        return (
          <TableRow
            key={bill.uri}
            sx={{ "&:nth-of-type(even)": { backgroundColor: "#e9e9e9" } }}
          >
            {table.columnsOrder.map((oneColumnName) => {
              const fieldValue: any = bill[oneColumnName as keyof BillInner];

              return (
                // @ts-expect-error ts is not accepting any "as keyof {{type}}" as valid
                <TableCell key={oneColumnName} {...table.cells[oneColumnName]}>
                  {oneColumnName === "sponsors" && Array.isArray(fieldValue) ? (
                    generateSponsorList(fieldValue)
                  ) : oneColumnName === "titles" ? (
                    <InfoButton bill={bill} index={index} />
                  ) : oneColumnName === "save" ? (
                    <FavouriteButton bill={wholeBill} index={index} />
                  ) : (
                    fieldValue
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export default PopulatedBody;

import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import InfoIcon from "@mui/icons-material/Info";
import useTitleStore from "@/store/useTitleStore";
import type { Props } from "./InfoButton.types";

const InfoButton: React.FC<Props> = ({ bill, index }) => {
  const setTitles = useTitleStore((state) => state.setTitles);

  const removeHtmlTags = (text: string) =>
    text.replace(/(<\/?p>)|(<br \/>)/gi, "");

  return (
    <ButtonBase
      data-testid={`title-button-${index}`}
      disabled={!bill.longTitleEn && !bill.longTitleGa}
      onClick={() =>
        setTitles({
          en: removeHtmlTags(bill.longTitleEn),
          ga: removeHtmlTags(bill.longTitleGa),
        })
      }
    >
      <InfoIcon
        sx={{
          color: "#777777",
          opacity: !bill.longTitleEn && !bill.longTitleGa ? 0.2 : 1,
        }}
      />
    </ButtonBase>
  );
};

export default InfoButton;

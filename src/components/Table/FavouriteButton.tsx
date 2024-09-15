import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import StarIcon from "@mui/icons-material/Star";
import useMockFavourites from "@/helpers/useMockFavourites";
import type { Props } from "./FavouriteButton.types";

const FavouriteButton: React.FC<Props> = ({ bill, index }) => {
  const {
    isFavourite,
    toggleFromFavourites,
    isPending: aFavouriteIsPending,
  } = useMockFavourites();

  return (
    <ButtonBase
      data-testid={`star-button-${index}`}
      onClick={() => toggleFromFavourites(bill)}
      disabled={aFavouriteIsPending}
    >
      <StarIcon color={isFavourite(bill.bill.uri) ? "secondary" : "disabled"} />
    </ButtonBase>
  );
};

export default FavouriteButton;

import React from "react";
import Grid from "@mui/material/Grid";
import Filter from "./Filter";
import { filters } from "@/config";
import type { Props } from "./FilterGroup.types";

const FilterGroup: React.FC<Props> = ({ disabled }) => {
  return (
    <Grid container justifyContent={"center"} gap={10} sx={{ marginBottom: 1 }}>
      {filters.map(({ label, name, options, defaultOption }) => {
        return (
          <Filter
            key={name}
            {...{ label, name, options, defaultOption, disabled }}
          />
        );
      })}
    </Grid>
  );
};

export default FilterGroup;

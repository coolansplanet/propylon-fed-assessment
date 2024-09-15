import React, { useEffect } from "react";
import type { Props } from "./Filter.types";
import kebabCase from "lodash/kebabCase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useTableParams from "@/helpers/useTableParams";

const Filter: React.FC<Props> = ({
  name,
  label,
  options,
  defaultOption,
  disabled,
}) => {
  const id = `${kebabCase(label)}-menu-label`;

  const { updateParams, ...params } = useTableParams();

  const onSelectionChange = (e: SelectChangeEvent) => {
    updateParams({ [name]: e.target.value, page: 0 });
  };

  useEffect(() => {
    !params[name as keyof object] &&
      updateParams({ [name]: options[defaultOption].value });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ textAlign: "center" }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        value={params[name as keyof object] || options[defaultOption].value}
        label={label}
        disabled={disabled}
        onChange={onSelectionChange}
      >
        {options.map(({ label, value }) => {
          return (
            <MenuItem value={value} key={label}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
export default Filter;

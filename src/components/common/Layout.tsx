import React from "react";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import type { Props } from "./Layout.types";

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Grid minHeight={"100vh"}>
      <Header />
      <Grid
        paddingTop={5}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;

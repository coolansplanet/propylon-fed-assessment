import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import Layout from "./components/common/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./config";

const queryClient = new QueryClient();

const routes = [
  {
    path: pages.home.path,
    element: <Home />,
  },
  {
    path: pages.favourites.path,
    element: <Favourites />,
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map((routeProps) => {
                return <Route key={routeProps.path} {...routeProps} />;
              })}
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

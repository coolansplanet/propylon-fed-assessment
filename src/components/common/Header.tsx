import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { pages } from "@/config";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", gap: 20 } }}
            justifyContent="center"
          >
            {Object.values(pages).map(({ label, path }) => (
              <Link
                href={path}
                key={path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: pathname === path ? 700 : 400,
                }}
              >
                {label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

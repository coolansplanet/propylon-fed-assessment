import { styled } from "@mui/system";

export const ModalBox = styled("div")({
  position: "absolute",
  backgroundColor: "white",
  padding: 20,
  borderRadius: 4,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  boxShadow: "0 0 40px rgba(0,0,0,0.5)",
});

export const Button = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary?.main,
  color: "white",
  borderRadius: 4,
  fontSize: 16,
  border: "none",
  padding: "14px 24px 14px 24px",
  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.secondary?.main,
  },
}));

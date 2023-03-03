import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { getUserData } from "../features/auth/authSlice";
import { ColorModeContext, useMode } from "../theme";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import { tokens } from "../theme";
import Navbar from "../components/Navbar";

export default function Layout() {
  const themes = useTheme();
  const colors = tokens(themes.palette.mode);
  const mode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 700px)");

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Outlet />
        <Box
          className="footer"
          sx={{
            "& > footer": {
              textAlign: "center",
            },
          }}
        >
          <Box mr="auto">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                className="social-btn"
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                className="social-btn"
              />
            </a>
          </Box>
          <footer>Copyright &copy; Deva, All Rights Reserved</footer>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

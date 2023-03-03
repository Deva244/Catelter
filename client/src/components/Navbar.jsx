import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  SwipeableDrawer,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../theme";
import { getUserData } from "../features/auth/authSlice";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Navbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [scroll, setScroll] = useState(false);

  window.onscroll = (e) => {
    if (window.scrollY != 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const paths = ["/", "/pets", "/about", "/contact"];

  const currentPath = paths.indexOf(pathname);

  const Desktop = useMediaQuery("(min-width: 760px)");

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (currentPath >= 0 && currentPath < 5) {
      setValue(currentPath);
    }
  }, [pathname]);

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(getUserData());
    }
  }, [userData]);

  const admin = userData.length === 0 ? "/login" : "/admin";

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <Box>
      <Box
        bgcolor={colors.blueAccent[600]}
        position="fixed"
        borderRadius="50%"
        zIndex="2"
        p="5px"
        boxShadow="0px 20px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
        onClick={() => window.scroll(0, 0)}
        sx={{
          bottom: 50,
          right: 50,
          display: scroll && Desktop ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: "34px" }} />
      </Box>
      <Box
        position="fixed"
        top="0"
        zIndex="2"
        width="100%"
        display="flex"
        justifyContent="left"
        alignItems="center"
        backgroundColor={colors.primary[500]}
        height="60px"
        boxShadow="0px 20px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
        sx={{ opacity: scroll ? undefined : "0.9" }}
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          <img className="logo-img" src="/logo.png" />
          <Typography
            sx={{
              mr: "15px",
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Catelter
          </Typography>
        </Box>
        <Box display={Desktop ? "none" : "flex"} ml="auto" p={2}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              color: "white",
              ":focus": {
                outline: "none",
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon sx={{ fontSize: "28px" }} />
            ) : (
              <LightModeOutlinedIcon sx={{ fontSize: "28px" }} />
            )}
          </IconButton>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              color: "white",
              ":focus": {
                outline: "none",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{
              "& .MuiPaper-root": {
                bgcolor: colors.primary[400],
                backgroundImage: "none",
              },
            }}
          >
            <Box
              onClick={toggleDrawer(false)}
              sx={{
                width: 250,
                "& .MuiTabs-flexContainer": {
                  height: "100%",
                },
                "& .MuiButtonBase-root": {
                  color: "white",
                  fontSize: "16px",
                  ":focus": {
                    outline: "none",
                  },
                  ":hover": {
                    color: "#868dfb",
                    textShadow:
                      "0 0 10px #868dfb,0 0 20px #868dfb,0 0 40px #868dfb",
                  },
                },
                "& .MuiTab-root.Mui-selected": {
                  textShadow: "0 0 10px #868dfb,0 0 10px #868dfb",
                  color: "#868dfb",
                },
                "& .MuiTabs-indicator": {
                  bgcolor: "#868dfb",
                },
              }}
            >
              <Tabs value={value} orientation="vertical">
                <Tab label="Home" onClick={() => navigate("/")} />
                <Tab label="Cats" onClick={() => navigate("/pets")} />
                <Tab label="About" onClick={() => navigate("/about")} />
                <Tab label="Contact" onClick={() => navigate("/contact")} />
                <Tab
                  label="Adoption Form"
                  onClick={() => navigate("/form")}
                  sx={{ borderTop: "1px solid grey" }}
                />
              </Tabs>
            </Box>
          </SwipeableDrawer>
        </Box>
        <Box
          display={Desktop ? "flex" : "none"}
          height="100%"
          sx={{
            "& .MuiTabs-flexContainer": {
              height: "100%",
            },
            "& .MuiButtonBase-root": {
              color: "white",
              fontSize: "16px",
              ":focus": {
                outline: "none",
              },
              ":hover": {
                color: "#868dfb",
                textShadow:
                  "0 0 10px #868dfb,0 0 20px #868dfb,0 0 40px #868dfb",
              },
            },
            "& .MuiTab-root.Mui-selected": {
              textShadow: "0 0 10px #868dfb,0 0 10px #868dfb",
              color: "#868dfb",
            },
            "& .MuiTabs-indicator": {
              bgcolor: "#868dfb",
            },
          }}
        >
          <Tabs value={value}>
            <Tab label="Home" onClick={() => navigate("/")} />
            <Tab label="Cats" onClick={() => navigate("/pets")} />
            <Tab label="About" onClick={() => navigate("/about")} />
            <Tab label="Contact" onClick={() => navigate("/contact")} />
          </Tabs>
        </Box>
        <Box
          display={Desktop ? "flex" : "none"}
          alignItems="center"
          ml="auto"
          mr="15px"
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              color: "white",
              mr: "10px",
              ":focus": {
                outline: "none",
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Button
            onClick={() => navigate(`/form/choose/no`)}
            sx={{
              bgcolor: colors.blueAccent[500],
              fontSize: "13px",
              fontWeight: "bold",
              ":hover": {
                bgcolor: colors.blueAccent[400],
              },
              ":focus": {
                outline: "none",
              },
            }}
          >
            Adoption Form
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

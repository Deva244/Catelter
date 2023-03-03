import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  async function handleLogout() {
    await dispatch(reset());
    await dispatch(logout());
    handleClose();
    navigate("/");
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box>
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            color: colors.grey[100],
            ":focus": {
              outline: "none",
            },
          }}
        >
          <KeyboardBackspaceOutlinedIcon />
          <Typography sx={{ m: "0 3px" }}>Home</Typography>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            color: colors.grey[100],
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
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: colors.grey[100],
            ":focus": {
              outline: "none",
            },
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate(`/cadmin/account`);
              handleClose();
            }}
          >
            {userData.image === "image" ? (
              <Avatar sx={{ width: 32, height: 32, mr: 1, ml: -0.5 }} />
            ) : (
              <Avatar
                src={userData.imageUrl}
                sx={{ width: 32, height: 32, mr: 1, ml: -0.5 }}
              />
            )}
            My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;

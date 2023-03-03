import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ unread, unviewed, display }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { userData } = useSelector((store) => store.auth);

  const { pathname } = useLocation();

  const currentPath = pathname.slice(8);
  const pathTitle =
    currentPath.length === 0
      ? "Dashboard"
      : currentPath.toUpperCase()[0] + currentPath.slice(1) === "Account"
      ? ""
      : currentPath.toUpperCase()[0] + currentPath.slice(1);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(pathTitle);

  useEffect(() => {
    if (pathTitle === "") {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
    setSelected(pathTitle);
  }, [pathname]);

  if (useMediaQuery("(max-width: 600px)")) {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  }

  return (
    <Box
      display={display}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: isNonMobile ? "100%" : "220%",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: isNonMobile
            ? "5px 35px 5px 20px !important"
            : "5px 35px 5px 5px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sidebar.collapsed": {
          width: isNonMobile ? "80px" : "45px",
          minWidth: isNonMobile ? "80px" : "45px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              display: isNonMobile ? "block" : "none",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  CATELTER
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {userData.image === "image" ? (
                  <Avatar sx={{ width: 140, height: 140 }} />
                ) : (
                  <Avatar
                    src={userData.imageUrl}
                    sx={{ width: 140, height: 140, bgcolor: colors.grey[500] }}
                  />
                )}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData.nickname}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData.access}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/cadmin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
                display: isNonMobile ? "block" : "none",
              }}
            >
              Manage
            </Typography>
            <Item
              title="Team"
              to="/cadmin/team"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pets"
              to="/cadmin/pets"
              icon={<PetsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
                display: isNonMobile ? "block" : "none",
              }}
            >
              Users
            </Typography>
            <Item
              title="Messages"
              to="/cadmin/messages"
              icon={
                <Badge
                  badgeContent={unread}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <EmailOutlinedIcon />
                </Badge>
              }
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Forms"
              to="/cadmin/forms"
              icon={
                <Badge
                  badgeContent={unviewed}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <FeedOutlinedIcon />
                </Badge>
              }
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Donations"
              to="/cadmin/donations"
              icon={<AttachMoneyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userData.access === "Admin" && (
              <Box>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{
                    m: "15px 0 5px 20px",
                    display: isNonMobile ? "block" : "none",
                  }}
                ></Typography>
                <Item
                  title="Updates"
                  to="/cadmin/updates"
                  icon={<CampaignOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

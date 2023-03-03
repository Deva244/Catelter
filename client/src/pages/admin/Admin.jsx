import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { getUserData } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { getUnreadCount } from "../../features/message/messageSlice";
import { getUnviewedCount } from "../../features/form/formSlice";
import Topbar from "../../components/admin/Topbar";
import Sidebar from "../../components/admin/Sidebar";
import Loading from "../../components/Loading";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { unreadCount } = useSelector((store) => store.message);

  const { unviewedCount } = useSelector((store) => store.form);

  const [theme, colorMode] = useMode();

  const { user, userData, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (unreadCount.length === 0) {
      dispatch(getUnreadCount());
    }
    if (unviewedCount.length === 0) {
      dispatch(getUnviewedCount());
    }
  }, [unreadCount, unviewedCount]);

  const [userInfo, setUserInfo] = useState(userData);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/login");
    }

    if (!user) {
      if (userInfo.length === 0) {
        dispatch(getUserData());
        setUserInfo(userData);
      }
    }
  }, [userInfo, isError]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="admin">
          <Sidebar
            unread={unreadCount}
            unviewed={unviewedCount}
            display={useMediaQuery("(min-width:330px)") ? "block" : "none"}
          />
          <main className="admin-page">
            <Topbar />
            <Outlet />
          </main>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

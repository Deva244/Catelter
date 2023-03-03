import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { getAllUsers } from "../features/auth/authSlice";
import ProfileCard from "../components/ProfileCard";

export default function Pets({ title, subtitle }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Desktop = useMediaQuery("(min-width:700px)");

  const { users, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
    if (users.length > 0) {
      setUsersData(users);
    }
    if (isError) {
      toast.error(message);
    }
  }, [users, isError]);

  if (isLoading) {
    <Loading />;
  }

  const userCard = usersData.map((user) => {
    return (
      <ProfileCard
        key={user._id}
        id={user._id}
        name={user.nickname}
        age={`Joined on ${user.joined}`}
        imageUrl={user.imageUrl}
        gender={user.access}
      />
    );
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={Desktop ? "5vh 15vw" : "3vh 6vw"}
    >
      <Typography variant="h1" sx={{ mb: "5px", textAlign: "center" }}>
        {title ? title : "Cats"}
      </Typography>
      <Typography
        variant="h5"
        sx={{ mb: "20px", color: colors.greenAccent[400], textAlign: "center" }}
      >
        {subtitle ? subtitle : "Available for adoption"}
      </Typography>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        sx={{
          "& .MuiCardContent-root": {
            padding: "10px",
          },
          "& > div": {
            gridColumn: Desktop ? undefined : "span 6",
          },
        }}
      >
        {userCard}
      </Box>
    </Box>
  );
}

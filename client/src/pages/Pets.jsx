import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCats } from "../features/cat/catSlice";
import Loading from "../components/Loading";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

export default function Pets({ title, subtitle, page }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const Desktop = useMediaQuery("(min-width:700px)");
  const bigDesktop = useMediaQuery("(min-width:2000px)");

  const { cats, isError, isLoading, message } = useSelector(
    (state) => state.cat
  );

  const [catsData, setCatsData] = useState([]);

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(getCats());
    }
    if (cats.length > 0) {
      setCatsData(cats);
    }
    if (isError) {
      toast.error(message);
    }
  }, [cats, isError]);

  const catCard = catsData.map((cat) => {
    if (page === "lost") {
      if (cat.state === "Lost" || cat.state === "Found") {
        return (
          <ProfileCard
            key={cat._id}
            id={cat._id}
            name={cat.name}
            age={cat.age}
            imageUrl={cat.imageUrl}
            breed={cat.breed}
            state={cat.state}
            gender={cat.gender}
            about={cat.lastSeen}
          />
        );
      }
    } else {
      if (cat.state === "Available" || cat.state === "Unavailable") {
        return (
          <ProfileCard
            key={cat._id}
            id={cat._id}
            name={cat.name}
            age={cat.age}
            imageUrl={cat.imageUrl}
            breed={cat.breed}
            state={cat.state}
            gender={cat.gender}
            about={cat.about}
          />
        );
      }
    }
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={bigDesktop ? "100%" : undefined}
      m={Desktop ? "10vh 15vw" : "10vh 6vw"}
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
        {catCard}
      </Box>
    </Box>
  );
}

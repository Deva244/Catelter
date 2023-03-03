import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCats } from "../features/cat/catSlice";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export default function CatProfile() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Desktop = useMediaQuery("(min-width: 1024px)");

  const { cats } = useSelector((state) => state.cat);

  useEffect(() => {
    dispatch(getCats());
  }, []);

  const cat = cats.filter((cat) => cat.name === name);

  if (cat.length === 0) {
    return null;
  }

  return (
    <Box
      m={Desktop ? "10vh 5rem" : "9vh 1rem"}
      height="100%"
      bgcolor={colors.primary[400]}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          backgroundColor: colors.greenAccent[500],
          borderBottom: `1px solid ${colors.grey[100]}`,
          p: "7px",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "black",
            textAlign: "center",
          }}
        >
          {name}'s Profile
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="100%">
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          width="100%"
          sx={{
            "& > div": { gridColumn: Desktop ? undefined : "span 6" },
          }}
        >
          <Box gridColumn="span 1">
            <img src={cat[0].imageUrl} width="100%" />
          </Box>
          <Box
            gridColumn="span 5"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            m={Desktop ? "0 0 0 10px" : "10px"}
          >
            <Typography variant="h5">
              <b>Name:</b> {cat[0].name}
            </Typography>
            <Typography variant="h5">
              <b>Age:</b> {cat[0].age}
            </Typography>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {cat[0].gender}
              {cat[0].gender === "Male" ? (
                <MaleIcon sx={{ color: "#6495ED", fontSize: "24px" }} />
              ) : (
                <FemaleIcon sx={{ color: "#e23481", fontSize: "24px" }} />
              )}
            </Typography>
            <Typography variant="h5">
              <b>Breed:</b> {cat[0].breed}
            </Typography>
            <Typography variant="h5">
              <b>Spayed/Neutered:</b> {cat[0].neutered}
            </Typography>
          </Box>
          <Divider sx={{ gridColumn: "span 6", borderBottomWidth: "2px" }} />
          <Box
            gridColumn="span 6"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            ml="10px"
            mt="10px"
          >
            <Typography variant="h5" sx={{ mb: "10px" }}>
              <b>Health:</b> {cat[0].health}
            </Typography>
            <Typography variant="h5" sx={{ mb: "10px" }}>
              <b>About:</b> {cat[0].about}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          backgroundColor: colors.greenAccent[500],
          borderTop: `1px solid ${colors.grey[100]}`,
          p: "7px",
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "4px",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              color: "black",
              textAlign: "center",
              mr: "0.7rem",
            }}
          >
            {cat[0].state}
          </Typography>
          {cat[0].state === "Available" && (
            <Button
              onClick={() => navigate(`/form/choose/yes=${cat[0].name}`)}
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
              Adopt
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

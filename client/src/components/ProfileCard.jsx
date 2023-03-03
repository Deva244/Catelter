import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useTheme,
  Badge,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    left: -45,
    top: 15,
    width: 100,
    position: "absolute",
    fontSize: "12px",
  },
}));

export default function ProfileCard({
  id,
  state,
  imageUrl,
  name,
  gender,
  age,
  breed,
  about,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:1024px)");

  return (
    <Card
      display="none"
      key={id}
      sx={{
        minWidth: 200,
        maxWidth: 400,
        gridColumn: isNonMobile ? "span 2" : "span 3",
        backgroundColor: colors.primary[400],
      }}
    >
      <StyledBadge badgeContent={state} color="primary">
        <CardMedia
          component="img"
          image={imageUrl ? imageUrl : "/person.png"}
          title={name}
          onClick={() => {
            state === "Available" || state === "Unavailable"
              ? navigate(`/pets/${name}`)
              : undefined;
          }}
          sx={{ cursor: "pointer" }}
        />
      </StyledBadge>
      <CardContent>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
          {name} -
          <Typography
            variant="p"
            sx={{
              color: colors.grey[300],
              fontSize: 17,
              display: "flex",
              alignItems: "center",
              ml: "5px",
            }}
          >
            {gender}{" "}
            {gender === "Male" ? (
              <MaleIcon sx={{ color: "#6495ED", fontSize: "24px" }} />
            ) : gender === "Female" ? (
              <FemaleIcon sx={{ color: "#e23481", fontSize: "24px" }} />
            ) : undefined}
          </Typography>
        </Typography>
        <Typography>{age}</Typography>
        <Typography>{breed}</Typography>
        <Typography sx={{ mt: "10px" }}>{about}</Typography>
      </CardContent>
      <CardActions>
        {state === "Available" && (
          <Button
            onClick={() => navigate(`/form/choose/yes=${name}`)}
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
        {state === "Lost" && (
          <Button
            onClick={() => document.getElementById("contact").scrollIntoView()}
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
            Contact
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

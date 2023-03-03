import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
  Paper,
  Grow,
} from "@mui/material";
import { tokens } from "../theme";
import { getCats } from "../features/cat/catSlice";
import MessageForm from "../components/MessageForm";
import Pets from "./Pets";
import TeamMembers from "../components/TeamMembers";

export default function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Desktop = useMediaQuery("(min-width:1000px)");
  const smallDesktop = useMediaQuery("(max-width: 1600px)");
  const smallerDesktop = useMediaQuery("(max-width: 1280px)");

  const [checked, setChecked] = useState(true);

  const { cats, isError, message } = useSelector((state) => state.cat);

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

  if (catsData.length === 0) {
    return null;
  }

  const cardGrow = catsData.map((cat) => {
    if (cat.state === "Lost" || cat.state === "Found") {
      return null;
    }
    return (
      <Grow
        key={cat._id}
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 2000 } : {})}
      >
        <Box
          gridColumn="span 2"
          sx={{
            "& > img": {
              borderRadius: "4px",
              boxShadow:
                "0px 11px 15px 7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.2),0px 9px 46px 8px rgba(0,0,0,0.2)",
            },
          }}
        >
          <img src={cat.imageUrl} width={Desktop ? "200px" : "100px"} />
        </Box>
      </Grow>
    );
  });

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url(frontpage.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: Desktop ? "center" : "left",
          backgroundSize: "cover",
          height: Desktop ? "55rem" : "40rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          width={Desktop ? "70%" : "85%"}
          bgcolor="rgb( 70, 72, 84, 0.7 )"
          p="2rem 1.5rem"
          sx={{
            mt: Desktop ? "12rem" : "2rem",
            display: "flex",
            justifyContent: Desktop ? "space-between" : "center",
            alignItems: "center",
            flexDirection: smallerDesktop ? "column" : undefined,
          }}
        >
          <Box>
            <Typography
              variant={Desktop ? "h1" : "h2"}
              sx={{
                color: "#70d8bd",
                fontWeight: "bold",
                textAlign: Desktop ? "left" : "center",
              }}
            >
              Find your new best friend
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#b7ebde",
                textAlign: Desktop ? "none" : "center",
                mt: Desktop ? "0" : "10px",
                "& > a": {
                  textDecoration: "none",
                  color: "#868dfb",
                },
              }}
            >
              <Link to="/form/choose/no">Adopt</Link> a cat today
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: "15px",
              mt: smallerDesktop ? "1rem" : undefined,
              "& > div": {
                gridColumn: smallDesktop ? "span 3" : undefined,
              },
            }}
          >
            {cardGrow}
          </Box>
        </Box>
      </Box>
      {/* DONATE */}
      <Box
        sx={{
          backgroundImage: "url(/donate_cat.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: Desktop ? "40rem" : "30rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "44px",
            color: colors.grey[900],
            fontWeight: "bold",
            color: colors.primary[500],
            textAlign: "center",
            bgcolor: "rgb( 221, 221, 221, 0.4 )",
            p: "0 10px",
          }}
        >
          Your donations help save more lives
        </Typography>
        <Button
          onClick={() => navigate("/donate")}
          sx={{
            bgcolor: colors.blueAccent[500],
            fontSize: "24px",
            fontWeight: "bold",
            mt: "20px",
            ":hover": {
              bgcolor: colors.blueAccent[400],
            },
            ":focus": {
              outline: "none",
            },
          }}
        >
          Donate
        </Button>
      </Box>
      {/* CONTACT */}
      <Box
        id="contact"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor={colors.primary[400]}
        p={Desktop ? "4vh 1rem" : "4vh 4rem"}
      >
        <MessageForm />
        <Box display={Desktop ? "block" : "none"}>
          <img src="/Bifi_Mango.jpg" width="498px" height="331.5px" />
        </Box>
      </Box>
      {/* Lost & Found */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          "& > div.MuiBox-root": {
            m: Desktop ? "5vh 15vw" : "5vh 6vw",
          },
        }}
      >
        <Pets
          title="Lost & Found"
          subtitle="Help reunite these pets with their owners"
          page="lost"
        />
      </Box>
      {/* TEAM */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor={colors.primary[400]}
      >
        <TeamMembers title="Meet The Team" subtitle="Our team members" />
      </Box>
    </Box>
  );
}

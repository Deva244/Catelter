import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCats } from "../../features/cat/catSlice";
import { getAllUsers } from "../../features/auth/authSlice";
import {
  getAllMessages,
  getHandledMsgs,
} from "../../features/message/messageSlice";
import { getAllForms, getHandledForms } from "../../features/form/formSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import PetsIcon from "@mui/icons-material/Pets";
import FeedIcon from "@mui/icons-material/Feed";
import CampaignIcon from "@mui/icons-material/Campaign";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:750px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { cats } = useSelector((store) => store.cat);
  const { users } = useSelector((store) => store.auth);
  const { data, unreadCount, handledMessages } = useSelector(
    (store) => store.message
  );
  const { forms, unviewedCount, handledForms } = useSelector(
    (store) => store.form
  );

  const catsArray = cats;

  const availableCats = catsArray.filter((cat) => cat.state === "Available");
  const unavailableCats = catsArray.filter(
    (cat) => cat.state === "Unavailable"
  );
  const lostFoundCats = catsArray.filter(
    (cat) => cat.state === "Lost" || cat.state === "Found"
  );

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(getCats());
    }
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
    if (data.length === 0) {
      dispatch(getAllMessages());
      dispatch(getHandledMsgs());
    }
    if (cats.length === 0) {
      dispatch(getAllForms());
      dispatch(getHandledForms());
    }
  }, [cats, users, data, forms]);

  return (
    <Box sx={{ m: isNonMobile ? "20px 40px" : "15px 20px" }}>
      <Header title="Dashboard" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(8, minmax(0,1fr))"
        gap="25px"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
        }}
      >
        <Box
          gridColumn="span 8"
          p="1.7rem"
          sx={{
            borderRadius: "10px",
            background: "rgb(17,34,57)",
            background:
              "linear-gradient(48deg, rgba(17,34,57,1) 43%, rgba(29,42,61,1) 82%, rgba(29,42,61,1) 100%)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              alignItems: "center",
              color: colors.grey[900],
            }}
          >
            <CampaignIcon
              sx={{ fontSize: "34px", mr: 1.5, color: colors.blueAccent[500] }}
            />
            Updates
          </Typography>
          <Typography sx={{ mt: "1rem", color: colors.grey[900] }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            magnam fuga minima, fugiat ea doloremque praesentium recusandae quos
            tempore vel magni deserunt quisquam soluta, architecto animi saepe
            excepturi dolor labore! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam molestias hic aut, beatae culpa
            possimus dolorem autem saepe quis perferendis ducimus sed quasi,
            itaque temporibus voluptatum nulla unde rerum porro? Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Autem voluptatum
            dolorum consectetur itaque non aliquam rerum laborum officia,
            facere, fugit aut ex beatae? Tenetur quod aut, amet voluptatem
            aliquid nisi?
          </Typography>
        </Box>
        <StatBox
          title="Team Members"
          icon={<GroupsIcon />}
          dataTitle1="Members"
          info1={users.length}
          destination="team"
        />
        <StatBox
          title="Cats"
          icon={<PetsIcon />}
          dataTitle1="Available"
          dataTitle2="Unavailable"
          dataTitle3="Lost & Found"
          dataTitle4="Total cats"
          info1={availableCats.length}
          info2={unavailableCats.length}
          info3={lostFoundCats.length}
          info4={cats.length}
          destination="pets"
        />
        <StatBox
          title="Messages"
          icon={<EmailIcon />}
          dataTitle1="Read"
          dataTitle2="Unread"
          dataTitle3="Handled"
          dataTitle4="Total messages"
          info1={data.length - unreadCount}
          info2={unreadCount}
          info3={handledMessages}
          info4={data.length}
          destination="messages"
        />
        <StatBox
          title="Adoption Forms"
          icon={<FeedIcon />}
          dataTitle1="Viewed"
          dataTitle2="Unopened"
          dataTitle3="Handled"
          dataTitle4="Total forms"
          info1={forms.length - unviewedCount}
          info2={unviewedCount}
          info3={handledForms}
          info4={forms.length}
          destination="forms"
        />
      </Box>
    </Box>
  );
}

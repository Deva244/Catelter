import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../theme";
import MessageForm from "../components/MessageForm";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Desktop = useMediaQuery("(min-width:1024px)");
  const Tablet = useMediaQuery("(min-width: 700px)");

  return (
    <Box m={Desktop ? "5rem 10rem" : "5rem 0.7rem 20rem 0.7rem"} height="100%">
      <Typography variant="h1">Contact</Typography>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={Desktop || Tablet ? "row" : "column"}
        m="1rem 0"
      >
        <img src="contact.jpeg" width={Desktop ? "400px" : "100%"} />
        <Box
          m={
            Desktop
              ? "0  0 auto 1rem"
              : Tablet
              ? "0  0 auto 1rem"
              : "0.7rem auto 0 0"
          }
        >
          <Typography variant="h3" sx={{ mb: "0.7rem" }}>
            Contact Info
          </Typography>
          <Typography
            sx={{ mb: "0.3rem", display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: "0.4rem" }} /> Cairo - Egypt
          </Typography>
          <Typography
            sx={{ mb: "0.3rem", display: "flex", alignItems: "center" }}
          >
            <PhoneIcon sx={{ mr: "0.4rem" }} /> +20 106 423 1199
          </Typography>
          <Typography
            sx={{ mb: "0.3rem", display: "flex", alignItems: "center" }}
          >
            <EmailIcon sx={{ mr: "0.4rem" }} /> moatz.mohamed.mahmoud@gmail.com
          </Typography>
        </Box>
      </Box>
      <Box bgcolor={colors.primary[400]} p="1.3rem 0.5rem" mb="3rem">
        <MessageForm />
      </Box>
    </Box>
  );
}

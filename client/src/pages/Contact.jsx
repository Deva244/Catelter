import { Box, Typography, useMediaQuery } from "@mui/material";
import MessageForm from "../components/MessageForm";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  const Desktop = useMediaQuery("(min-width:1000px)");
  const Tablet = useMediaQuery("(min-width: 600px)");

  return (
    <Box m={Desktop ? "10vh 10rem" : "10vh 0.7rem"} height="100%">
      <Typography variant="h1">Contact</Typography>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={Desktop || Tablet ? "row" : "column"}
        m="2rem 0"
      >
        <img
          src="contact.jpg"
          width={Desktop ? "500px" : Tablet ? "500px" : "100%"}
        />
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
            <HomeIcon sx={{ mr: "0.4rem" }} /> Address
          </Typography>
          <Typography
            sx={{ mb: "0.3rem", display: "flex", alignItems: "center" }}
          >
            <PhoneIcon sx={{ mr: "0.4rem" }} /> 0123456789
          </Typography>
          <Typography
            sx={{ mb: "0.3rem", display: "flex", alignItems: "center" }}
          >
            <EmailIcon sx={{ mr: "0.4rem" }} /> email@catelter.com
          </Typography>
        </Box>
      </Box>
      <Box bgcolor="#1f2a40" p="1.3rem 0.5rem">
        <MessageForm />
      </Box>
    </Box>
  );
}

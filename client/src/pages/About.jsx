import { Box, Typography, useMediaQuery } from "@mui/material";

export default function About() {
  const Desktop = useMediaQuery("(min-width:1000px)");

  return (
    <Box m={Desktop ? "10vh 10rem" : "10vh 0.7rem"} height="100%">
      <Typography variant="h1">About Us</Typography>
      <Typography variant="h5" sx={{ mt: "2rem" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut doloremque
        aut itaque voluptate officiis similique vel omnis in laudantium, beatae
        et perferendis saepe voluptatibus facilis, quia, placeat ducimus odio!
        Necessitatibus.
      </Typography>
    </Box>
  );
}

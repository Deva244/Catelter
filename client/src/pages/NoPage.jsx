import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function NoPage() {
  const Desktop = useMediaQuery("(min-width:1024px)");
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      mt="1px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      maxHeight="100%"
      bgcolor="white"
      overflow="hidden"
    >
      <Typography
        sx={{
          fontSize: mobile ? "40px" : "70px",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          fontSize: mobile ? "40px" : "70px",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        Page not found
      </Typography>
      <Typography
        sx={{
          mt: "2rem",
          mb: "1rem",
          fontSize: mobile ? "20px" : "40px",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          "& > a": {
            textDecoration: "none",
            color: "#868dfb",
          },
        }}
      >
        Are you lost, need <Link to="/">help</Link>?
      </Typography>
      <img
        src="/nopage.jpg"
        width={Desktop ? "1000px" : mobile ? "300px" : "600px"}
      />
    </Box>
  );
}

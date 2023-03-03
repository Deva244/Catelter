import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

export default function StatBox({
  icon,
  title,
  dataTitle1,
  dataTitle2,
  dataTitle3,
  dataTitle4,
  info1,
  info2,
  info3,
  info4,
  destination,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:1160px)");

  return (
    <Box
      p="1.7rem"
      sx={{
        borderRadius: "10px",
        background: "rgb(17,34,57)",
        background:
          "linear-gradient(48deg, rgba(17,34,57,1) 43%, rgba(29,42,61,1) 82%, rgba(29,42,61,1) 100%)",
        gridColumn: isNonMobile ? "span 2" : "span 4",
      }}
    >
      <Box
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "34px",
            mr: 1.5,
            color: colors.blueAccent[500],
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.grey[900],
            cursor: "pointer",
          }}
          onClick={() => navigate(`/admin/${destination}`)}
        >
          {icon}
          {title}
        </Typography>
      </Box>
      <Box mt="0.5rem">
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              color: colors.grey[900],
            }}
          >
            {dataTitle1}
          </Typography>
          <Typography sx={{ color: colors.greenAccent[500], ml: 1 }}>
            {info1}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              color: colors.grey[900],
            }}
          >
            {dataTitle2}
          </Typography>
          <Typography sx={{ color: colors.greenAccent[500], ml: 1 }}>
            {info2}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              color: colors.grey[900],
            }}
          >
            {dataTitle3}
          </Typography>
          <Typography sx={{ color: colors.greenAccent[500], ml: 1 }}>
            {info3}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              color: colors.grey[900],
            }}
          >
            {dataTitle4}
          </Typography>
          <Typography sx={{ color: colors.greenAccent[500], ml: 1 }}>
            {info4}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

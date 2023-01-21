import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Banner1 from "../../asset/img10.jpg";
import Banner2 from "../../asset/img9.jpg";
import Banner3 from "../../asset/img9.jpg";
import { red, purple, blue, green, grey, yellow } from "@mui/material/colors";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
const images = [
  {
    url: Banner1,
    title: "Hamper",
    width: "20%",
  },
  {
    url: Banner2,
    title: "Resin",
    width: "20%",
  },
  {
    url: Banner3,
    title: "Home Decor",
    width: "20%",
  },
  {
    url: Banner1,
    title: "Hamper",
    width: "20%",
  },
  {
    url: Banner2,
    title: "Resin",
    width: "20%",
  },
  {
    url: Banner3,
    title: "Home Decor",
    width: "20%",
  },
  {
    url: Banner1,
    title: "Hamper",
    width: "20%",
  },
  {
    url: Banner2,
    title: "Resin",
    width: "20%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.up("xs")]: {
    width: "150px !important", // Overrides inline-style
    height: "100px !important",
  },
  [theme.breakpoints.up("sm")]: {
    width: "170px !important", // Overrides inline-style
    height: "10px !important",
  },
  [theme.breakpoints.up("md")]: {
    width: "200px !important", // Overrides inline-style
    height: "200px !important",
  },
  [theme.breakpoints.up("lg")]: {
    width: "320px !important", // Overrides inline-style
    height: "200px !important",
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        minWidth: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
      }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            margin: "15px",
            background: "rgba( 255, 255, 255, 0.2 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.3 )",
            backdropFilter: "blur( 4px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
        >
          <ImageSrc
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

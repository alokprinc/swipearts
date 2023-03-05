import React from "react";
// import Carousel from "react-elastic-carousel";
import { grey, red, blue, green, yellow } from "@mui/material/colors";
import GridCard from "../../utils/GridCard";
import Grid from "@mui/material/Unstable_Grid2";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Paper, Typography } from "@mui/material";
const occasions = [
  "Housewarming",
  "Marriage",
  "Birthday",
  "Anniversary",
  "Engagement",
  "Baby Shower",
  "Mother's Day",
  "Father's Day",
  "Holi",
  "Christmas & NewYear",
  "Navratri",
  "Valentine's Day",
];
export const ShopByOccasions = () => {
  return (
    <Paper
      elevation={2}
      style={{ position: "relative", top: "50px" }}
      sx={{
        background: grey[50],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ m: 2, fontSize: "20px" }}>Shop By Occasion</Typography>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "none",
        }}
      >
        <GridCard occasion={occasions[0]} />
        <GridCard occasion={occasions[1]} />
        <GridCard occasion={occasions[2]} />
        <GridCard occasion={occasions[3]} />
        <GridCard occasion={occasions[4]} />
        <GridCard occasion={occasions[5]} />
        <GridCard occasion={occasions[6]} />
        <GridCard occasion={occasions[7]} />
        <GridCard occasion={occasions[8]} />
        <GridCard occasion={occasions[9]} />
        <GridCard occasion={occasions[10]} />
        <GridCard occasion={occasions[11]} />
      </Grid>
    </Paper>
  );
};

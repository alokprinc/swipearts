import React from "react";
// import Carousel from "react-elastic-carousel";
import { grey, red, blue, green, yellow } from "@mui/material/colors";
import GridCard from "../utils/GridCard";
import Grid from "@mui/material/Unstable_Grid2";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Paper, Typography } from "@mui/material";

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
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "none",
        }}
      >
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
        <GridCard />
      </Grid>
    </Paper>
  );
};

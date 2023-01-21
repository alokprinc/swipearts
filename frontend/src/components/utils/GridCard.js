import React from "react";

import Banner1 from "../../asset/img11.jpeg";
import { grey, red, blue, green, yellow } from "@mui/material/colors";

import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

const GridCard = () => {
  return (
    <Grid
      lg={2}
      md={2}
      sm={3}
      xs={4}
      container
      alignItems="center"
      justifyContent="center"
      direction={"column"}
      sx={{
        padding: "5px",
        margin: "10px",
        background: "rgba( 255, 255, 255, 0.2 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        borderRadius: "5px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        width: { lg: "250px", md: "225px", sm: "200px", xs: "150px" },
        transform: "perspective(1px) translateZ(0)",
        transitionDuration: "0.25s",
        transitionProperty: "transform",
        transitionTimingFunction: "ease-out",
        "&:hover": {
          transform: "translateY(-10px)",
        },
      }}
    >
      <Grid
        lg={12}
        md={12}
        sm={12}
        xs={12}
        component={"img"}
        src={Banner1}
        sx={{
          padding: "0px",
          m: 0,
          height: { lg: "250px", md: "225px", sm: "200px", xs: "150px" },

          borderRadius: "5px 5px 1px 1px",
        }}
      />
      <Typography>Occasions</Typography>
    </Grid>
  );
};

export default GridCard;

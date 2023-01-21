import { Stack, Typography, Paper, Box } from "@mui/material";
import React from "react";
import profilePic from "../../asset/profile.png";
import Rating from "react-stars";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 22,
    value: review.rating,
    isHalf: true,
  };
  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"flex-start"}
        alignItems={"center"}
        style={{
          borderBottom: "1px solid #d1d1d1",
          marginLeft: "1vmax",
          marginBottom: "0.2vmax",
          padding: "0.2vmax",
        }}
      >
        <Box
          component={"img"}
          src={profilePic}
          style={{ width: "4rem", height: "4rem", borderRadius: "5rem" }}
        />
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          style={{ width: "50vmax" }}
        >
          <Rating {...options} />
          <Typography
            variant="body"
            style={{
              fontSize: "14px",
              color: "#4f4f4f",
            }}
          >{`${review.name}`}</Typography>
          <Typography variant="body">{`${review.comment}`}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ReviewCard;

import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import { NavLink, useHistory } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import { Input } from "@mui/material";
import styled from "@emotion/styled";

//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
const theme = createTheme();
const StyledButton = styled(Button)((theme) => ({
  marginTop: "1rem",
  marginBottom: "1rem",
  background: purple[500],
  "&:hover": {
    background: purple[800],
  },
}));
export default function Profile() {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {`${user.name.slice(0, 1)}`}
              </Avatar>
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Typography>NAME</Typography>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  id="name"
                  name="name"
                  value={user.name}
                  autoFocus
                />
                <Typography>EMAIL</Typography>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  value={user.email}
                  autoFocus
                />
                <Typography>MOBILE NUMBER</Typography>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  id="number"
                  name="number"
                  value={"9876543210"}
                  autoFocus
                />
                <Typography>JOINED AT</Typography>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  id="number"
                  name="number"
                  value={user.createdAt.slice(0, 10)}
                  autoFocus
                />
                <Link style={{ textDecoration: "none" }} to="/update-profile">
                  <StyledButton type="submit" fullWidth variant="contained">
                    Update Profile
                  </StyledButton>
                </Link>
                <Link>
                  <StyledButton type="submit" fullWidth variant="contained">
                    Change Password
                  </StyledButton>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/">
                  <StyledButton type="submit" fullWidth variant="contained">
                    Home
                  </StyledButton>
                </Link>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

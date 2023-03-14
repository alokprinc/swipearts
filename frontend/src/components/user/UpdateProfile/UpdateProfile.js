import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, red, brown } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../layout/Loader/Loader";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";

//=============================================================

const theme = createTheme();

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    dispatch(updateProfile(fname + " " + lname, email));
  };
  useEffect(() => {
    if (user) {
      setFname(user.name.slice(0, user.name.length / 2));
      setLname(user.name.slice(user.name.length / 2, user.name.length));
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (isUpdated) {
      alert.success("Profile Updated");
      dispatch(loadUser());
      history.push("/accounts");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

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
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "secondary.main",
                  ".&:hover": { bgcolor: purple[500] },
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Profile Information
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                      placeholder={fname}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      name="lastName"
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                      placeholder={lname}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder={email}
                      autoComplete="email"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: purple[500] }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

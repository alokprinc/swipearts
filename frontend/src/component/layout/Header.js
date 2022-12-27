import React from "react";
import { AppBar, Toolbar } from "@mui/material";
const Header = () => {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>Swipe</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;

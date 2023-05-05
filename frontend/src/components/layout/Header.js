import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  useScrollTrigger,
  Slide,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Button,
  Tooltip,
  Zoom,
  TextField,
  Input,
  Drawer,
  SpeedDial,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { red, purple, blue, green, grey, yellow } from "@mui/material/colors";
import Logo from "../../asset/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { createRef } from "react";
import SearchBox from "./Search/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import DrawerContent from "./DrawerContent/DrawerContent";
//------------------------------------------------------------------
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: "rgba( 255, 255, 255, 0.7 )",
  boxShadow: "0 2px 5px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 4px )",
  zIndex: 1,
  border: "1px solid rgba( 255, 255, 255, 0.18 )",

  [theme.breakpoints.only("xs")]: {
    flexDirection: "column",
    height: "3.8rem !important",
    ".logo-toolbar": {
      // position: "absolute",
      // left: "12rem",
    },
    ".nav-link1": {
      position: "absolute",
      top: "10px",
      right: "6rem",
      color: green[700],
    },
    ".nav-link2": {
      position: "absolute",
      top: "10px",
      right: "1rem",
    },
    ".nav-link3": {
      position: "absolute",
      top: "10px",
      right: "3.5rem",
    },
    ".nav-link4": {
      position: "absolute",
      top: "8px",
      left: "10px",
    },
    ".search-box": {
      display: "none",
      width: "90% !important",
    },
  },
  [theme.breakpoints.only("sm")]: {
    flexDirection: "column",
    height: "7.7rem !important",
    ".nav-link1": {
      position: "absolute",
      top: "10px",
      right: "6.5rem",
      color: green[700],
    },
    ".nav-link2": {
      position: "absolute",
      top: "10px",
      right: "1rem",
    },
    ".nav-link3": {
      position: "absolute",
      top: "10px",
      right: "3.5rem",
    },
    ".nav-link4": {
      position: "absolute",
      top: "8px",
      left: "10px",
    },
    ".search-box": {
      // display: "none",
      width: "90% !important",
    },
  },
  [theme.breakpoints.only("md")]: {
    height: "62px !important",
    padding: "0",
  },
  [theme.breakpoints.up("lg")]: {
    height: "67px !important",
    padding: "0",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  background: grey[0],
  height: "12px",
  padding: "18px",
  border: "none",
  width: "100%",
  color: "black",
}));
const Search = styled("form")((theme) => ({
  width: "100%",
}));
//------------------------------------------------//
export default function Header(props) {
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchor, setAnchor] = useState("right");

  const history = useHistory();
  //================================
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  //===============================
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push({
        pathname: `/products`,
        search: `?keyword=${keyword}`,
      });
    } else {
      history.push({
        pathname: `/products`,
      });
    }
    setKeyword("");

    console.log("chal gya hehe...");
  };
  const handleDrawerClick = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    // console.log(window.screen.width);
    if (window.screen.width < 900) {
      setAnchor("left");
    }
  }, []);

  return (
    <HideOnScroll {...props}>
      {/* Navbar */}
      <StyledAppBar className="navbar">
        {/* Logo */}
        <Link to="/">
          <Toolbar className="logo-toolbar">
            <Box
              component="img"
              sx={{
                width: { lg: 200, md: 200, sm: 170, xs: 120 },
                margin: 1,
                objectFit: "contain",
              }}
              src={Logo}
              alt="My Logo"
            />
          </Toolbar>
        </Link>
        {/* Search Field */}
        {/* <form onSubmit={searchSubmitHandler}> */}
        <Search
          className="search-box"
          sx={{
            display: "flex",
            alignItems: "center",
            flex: "1",
            border: "solid 2px rgba(0, 0, 0, 0.22)",
            borderRadius: "30px",
            height: { lg: "50px", md: "45px", sm: "40px", xs: "30px" },
          }}
          onSubmit={searchSubmitHandler}
        >
          {/* Input Text Field */}
          <StyledInputBase
            placeholder="Search for products...."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <Input />
          </StyledInputBase>
          {/* Search Icon */}
          <IconButton size="large" type="submit" onClick={searchSubmitHandler}>
            <SearchIcon />
          </IconButton>
        </Search>
        {/* </form> */}
        {/* <Link to={`/search`}>
          <Box>
            <IconButton size="large">
              <SearchIcon />
            </IconButton>
          </Box>
        </Link> */}
        {/* 4 Links */}
        {/* <Toolbar className="nav-links"> */}
        {/* Link 1 */}
        <Link style={{ textDecoration: "none" }}>
          <Tooltip TransitionComponent={Zoom} title="WhatsApp">
            <IconButton
              className="nav-link1"
              size="large"
              sx={{
                color: green[500],

                marginLeft: "15px",
                "&:hover": {
                  color: green[700],
                },
              }}
            >
              <WhatsAppIcon size="large" />
            </IconButton>
          </Tooltip>
        </Link>
        {/* Link 2 */}
        <Link>
          <Tooltip TransitionComponent={Zoom} title="My Cart">
            <IconButton className="nav-link2" size="large">
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Link>
        {/* Link 3 */}
        <Link
          style={{ textDecoration: "none" }}
          to={isAuthenticated ? "/accounts" : "/signin"}
        >
          <IconButton className="nav-link3" size="large">
            {isAuthenticated ? (
              <Avatar {...stringAvatar(user.name)} />
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
        </Link>

        {/* Link 4 */}
        <Link>
          <Tooltip TransitionComponent={Zoom} title="Menu">
            <IconButton
              className="nav-link4"
              size="large"
              aria-label="drawer"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Drawer
            anchor={anchor}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box>
              <DrawerContent onClick={handleDrawerClick} />
            </Box>
          </Drawer>
        </Link>
        {/* </Toolbar> */}
      </StyledAppBar>
    </HideOnScroll>
  );
}

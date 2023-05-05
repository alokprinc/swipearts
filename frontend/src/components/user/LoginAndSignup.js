import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { purple } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
//-----------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//========================================
const LoginAndSignup = () => {
  const [value, setValue] = useState(0);
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading && !isAuthenticated ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%", mt: 0 }}>
          <Box sx={{ borderBottom: 0, borderColor: purple[500] }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                icon={<LockOutlinedIcon />}
                iconPosition="start"
                label="Sign In"
                {...a11yProps(0)}
              />
              <Tab
                icon={<LockOutlinedIcon />}
                iconPosition="start"
                label="Sign Up"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SignIn />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUp />
          </TabPanel>
        </Box>
      )}
    </>
  );
};

export default LoginAndSignup;

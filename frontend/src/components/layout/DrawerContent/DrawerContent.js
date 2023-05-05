import { Button, styled } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OrdersIcon from "@mui/icons-material/ShoppingBag";
import AboutIcon from "@mui/icons-material/Info";
import ContactIcon from "@mui/icons-material/SupportAgent";
import PolicyIcon from "@mui/icons-material/Policy";
import TermsIcon from "@mui/icons-material/Gavel";
import FAQIcon from "@mui/icons-material/LiveHelp";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors, logout } from "../../../actions/userActions";

//================================================
const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  alignContent: "center",
}));
const DrawerContent = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const homeHandler = () => {
    history.push("/");
  };
  const dashboardHandler = () => {
    history.push("/dashboard");
  };
  const wishlistHandler = () => {
    history.push("/wishlist");
  };
  const yourCartHandler = () => {
    history.push("/cart");
  };
  const yourOrdersHandler = () => {
    history.push("/orders");
  };
  const aboutHandler = () => {
    history.push("/about");
  };
  const contactHandler = () => {
    history.push("/contact");
  };
  const faqHandler = () => {
    history.push("/fqa");
  };
  const privacyPolicyHandler = () => {
    history.push("/policy");
  };
  const termsAndConditionsHandler = () => {
    history.push("/terms");
  };
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Log out success");
    history.push({
      pathname: `/`,
      // search: `?keyword=${keyword}`,
    });
  };
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //   }

  //   dispatch(clearErrors);
  // }, [dispatch, error, isAuthenticated, history]);

  return (
    <>
      <Stack direction={"column"}>
        <StyledButton
          className="button"
          size="large"
          variant="text"
          startIcon={<HomeIcon />}
          onClick={homeHandler}
        >
          HOME
        </StyledButton>

        {isAuthenticated && user.role === "admin" && (
          <StyledButton
            className="button"
            size="large"
            variant="text"
            startIcon={<DashboardIcon />}
            onClick={dashboardHandler}
          >
            DASHBOARD
          </StyledButton>
        )}
        <StyledButton
          className="button"
          size="large"
          variant="text"
          startIcon={<FavoriteIcon />}
          onClick={wishlistHandler}
        >
          WISHLIST
        </StyledButton>
        <StyledButton
          className="button"
          size="large"
          variant="text"
          startIcon={<ShoppingCartIcon />}
          onClick={yourCartHandler}
        >
          YOUR CART
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<OrdersIcon />}
          onClick={yourOrdersHandler}
        >
          YOUR ORDERS
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<AboutIcon />}
          onClick={aboutHandler}
        >
          ABOUT
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<ContactIcon />}
          onClick={contactHandler}
        >
          CONTACT
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<FAQIcon />}
          onClick={faqHandler}
        >
          FAQS
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<PolicyIcon />}
          onClick={privacyPolicyHandler}
        >
          PRIVACY POLICY
        </StyledButton>
        <StyledButton
          className="button"
          variant="text"
          size="large"
          startIcon={<TermsIcon />}
          onClick={termsAndConditionsHandler}
        >
          TERMS AND CONDITIONS
        </StyledButton>
        {isAuthenticated && (
          <StyledButton
            className="button"
            variant="text"
            size="large"
            startIcon={<LogoutIcon />}
            onClick={logoutHandler}
          >
            LOG OUT
          </StyledButton>
        )}
      </Stack>
    </>
  );
};

export default DrawerContent;

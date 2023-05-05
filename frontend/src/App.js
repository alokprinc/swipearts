import Header from "./components/layout/Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { red, purple } from "@mui/material/colors";

// import FlexTag from "./components/layout/utils/FlexTag";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ShowProducts } from "../src/components/layout/Products/ShowProducts";
import ProductDetails from "./components/utils/ProductDetails";
import Home from "./components/layout/Home/Home";
import Footer from "./components/layout/footer/Footer";
import SearchBox from "./components/layout/Search/SearchBox";
import LoginAndSignup from "./components/user/LoginAndSignup";
import { Box } from "@mui/system";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/user/UserOptions";
import Profile from "./components/user/Profile/Profile";
import ProtectedRoute from "./components/utils/ProtectedRoute/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile/UpdateProfile";
//////////////////////////////////////////////////
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d500f9",
        white: purple[50],
        purple: "#9500ae",
      },
      secondary: {
        main: "#f44336",
      },
    },
    width: {
      primary: 150,
      secondary: 200,
    },
  });
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box
          sx={{
            w: "100%",
            height: { lg: "60px", md: "45px", sm: "40px", xs: "0px" },
          }}
        ></Box>
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />

          <Route exact path="/products" component={ShowProducts} />
          <Route path="/products/:keyword" component={ShowProducts} />
          <Route exact path="/search" component={SearchBox} />
          <Route exact path="/signin" component={LoginAndSignup}></Route>
          <ProtectedRoute
            exact
            path="/accounts"
            component={Profile}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/update-profile"
            component={UpdateProfile}
          ></ProtectedRoute>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;

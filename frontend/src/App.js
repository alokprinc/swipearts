import Header from "./components/layout/Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { red, purple } from "@mui/material/colors";

// import FlexTag from "./components/layout/utils/FlexTag";
import useMediaQuery from "@mui/material/useMediaQuery";

import ProductDetails from "./components/utils/ProductDetails";
import Home from "./components/layout/Home/Home";
import Footer from "./components/layout/Footer";

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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;

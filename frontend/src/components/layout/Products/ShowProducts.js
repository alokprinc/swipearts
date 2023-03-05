import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Paper, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { blue, grey } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
//-------------------------------------

//-------------------------------------
// search params picking function
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export const ShowProducts = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, product, productsCount } = useSelector(
    (state) => state.products
  );

  // function call
  let query = useQuery();

  // setting value of keyword for search
  const keyword = query.get("keyword");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (keyword) dispatch(getProduct(keyword));
    else dispatch(getProduct(""));
  }, [dispatch, error, keyword]);
  return (
    <Fragment>
      <Paper
        elevation={2}
        style={{ position: "relative", top: "50px" }}
        sx={{
          background: grey[50],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ m: 2, fontSize: "20px" }}>Products</Typography>
        {loading ? (
          <Loader />
        ) : (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              background: "none",
            }}
          >
            {product &&
              product.map((product) => <ProductCard product={product} />)}
          </Grid>
        )}
      </Paper>
    </Fragment>
  );
};

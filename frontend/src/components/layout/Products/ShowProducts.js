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

//-------------------------------------
export const ShowProducts = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
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

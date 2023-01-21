import React, { Fragment } from "react";
import { ShopByOccasions } from "./ShopByOccasions";
import { ShowProducts } from "./ShowProducts";
import Slider from "./Slider";
import Product from "./Product";

const Home = () => {
  return (
    <Fragment>
      <Slider />
      <Product />
      <ShopByOccasions />
      <ShowProducts />
    </Fragment>
  );
};

export default Home;

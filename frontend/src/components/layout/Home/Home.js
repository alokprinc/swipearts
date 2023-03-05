import React, { Fragment } from "react";
import Product from "../ShopByCatagory/Product";
import { ShopByOccasions } from "../ShopByOcassion/ShopByOccasions";
import { ShowProducts } from "../Products/ShowProducts";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <Fragment>
      <Slider />
      <Product />
      <ShopByOccasions />
    </Fragment>
  );
};

export default Home;

import React from "react";
import ButtonBases from "../ShopByCatagory/ButtonBases";

const Product = () => {
  return (
    <>
      <ButtonBases
        sx={{
          background: "rgba( 255, 255, 255, 0.2 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      />
    </>
  );
};

export default Product;

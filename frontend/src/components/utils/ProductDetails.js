import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import Rating from "react-stars";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";

//---------------------------------------
const StyledStack = styled(Stack)(() => ({
  padding: "4vmax",

  background: grey[50],
  ".CarouselImage": {
    width: "100%",
  },
  ".ProductDetails-0": {
    // background: green[100],
    width: "35vmax",
    height: "45vmax",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".detailsBlock-1-1": {
    color: "rgb(54, 54, 54)",
    font: "600 1.6vmax cursive",
  },
  ".detailsBlock-1-2": {
    color: "rgba(54, 54, 54, 0.582)",
    font: "200 0.6vmax cursive",
  },
  ".detailsBlock-2": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTop: "1px solid rgba(0, 0, 0, 0.205)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.205)",
    width: "70%",
    padding: "1vmax 0",
  },
  ".detailsBlock-2-span": {
    color: "rgba(0, 0, 0, 0.699)",
    font: "200 0.8vmax cursive",
  },
  ".detailsBlock-3": {
    width: "70%",
    background: grey[100],
  },
  ".redColor": {
    color: red[700],
  },
  ".greenColor": {
    color: green[700],
  },
  // "& .btn-15": {
  //   background: "#b621fe",
  //   border: "none",
  //   zIndex: "1",
  //   "&:after": {
  //     position: "absolute",
  //     content: "none",
  //     width: "0",
  //     height: "100%",
  //     top: "0",
  //     right: "0",
  //     zIndex: "-1",
  //     backgroundColor: "#663dff",
  //     borderRadius: " 5px",
  //     boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5)",
  //     transition: "all 0.3s ease",
  //   },
  //   "& :hover,& .btn-15": {
  //     color: "#fff",
  //   },
  //   "& :hover , & :after,& .btn-15": {
  //     left: "0",
  //     width: "100%",
  //   },
  //   "& :active,& .btn-15": {
  //     top: "2px",
  //   },
  // },
}));
const StyledButton = styled("button")(() => ({
  ".btn-15": {
    background: "#b621fe",
    border: "none",
    zIndex: "1",
    ":after": {
      position: "absolute",
      content: "none",
      width: "0",
      height: "100%",
      top: "0",
      right: "0",
      zIndex: "-1",
      backgroundColor: "#663dff",
      borderRadius: " 5px",
      boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5)",
      transition: "all 0.3s ease",
    },
    ":hover": {
      color: "#fff",
    },
    ":hover ,:after": {
      left: "0",
      width: "100%",
    },
    ":active": {
      top: "2px",
    },
  },
}));
//---------------------------------------
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  // console.log("Product here => ", product);
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  const discount = Math.round(
    100 - (product.productSalePrice / product.productRegularPrice) * 100
  );
  const descriptionPoints = [
    "This is a Point 1",
    "This is a Point 2",
    "This is a Point 3",
    "This is a Point 4",
    "This is a Point 5",
    "This is a Point 6",
    "This is a Point 7",
    "This is a Point 8",
  ];
  const productSpecsPoints = [
    "SKU: HD1141360",
    "No. of Stems: 7",
    "Type of Flowers: Exotic Flowers",
    "Colour of Flower: Assorted",
    "Size Of Base: 17.80 x15.50 x 26.00 cm",
    "Type Of Base: Amex Basket",
    "Country of Origin: India",
  ];
  const productDisclaimerPoints = [
    "Delivered product might vary slightly from the image shown.",
    "This product is perishable therefore delivery will be attempted only once.",
    "The delivery cannot be redirected to any other address.",
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StyledStack
          className="ProductDetails"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Box className="ProductDetails-0">
            {product ? (
              <Carousel className="carousel" interval={1000000}>
                {product.otherImages &&
                  product.otherImages.map((item, i) => (
                    <Carousel.Item
                      style={{ width: "30vmax", overflow: "hidden" }}
                    >
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            ) : (
              <Skeleton
                variant="rectangular"
                width={"35vmax"}
                height={"40vmax"}
                animation="wave"
              />
            )}
          </Box>
          <Stack direction={"column"}>
            <ImageList
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                },
                height: { xs: 100, sm: 200, md: 400, lg: 580, xl: 580 },
                background: grey[100],
              }}
            >
              <ImageListItem>
                <Stack
                  direction={{ xs: "column", sm: "column" }}
                  spacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                  style={{
                    marginTop: "25px",
                    background: grey[100],
                    width: "50vmax",
                  }}
                >
                  <Box className="detailsBlock-1">
                    <Typography className="detailsBlock-1-1">
                      {product.name}
                    </Typography>
                    <Typography className="detailsBlock-1-2">
                      Product # {product._id}
                    </Typography>
                    <Box className="detailsBlock-1-2">
                      <Rating {...options} />
                      <Typography className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews >= 1
                          ? product.numOfReviews
                          : 0}{" "}
                        Reviews)
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="detailsBlock-3">
                    <Stack
                      direction={"row"}
                      spacing={1}
                      justifyContent={"flex-start"}
                      alignItems={"flex-end"}
                    >
                      <Typography
                        className="detailsBlock-3-Typography"
                        style={{
                          color: "#ba4350",
                          font: "600 24px Franklin Gothic Medium",
                          textAlign: "center",
                        }}
                      >{`₹${product.productSalePrice}`}</Typography>
                      <Typography
                        className="detailsBlock-3-Typography"
                        style={{
                          textDecoration: "line-through",
                          color: grey[500],
                          textDecorationColor: grey[500],
                          font: "400 18px Franklin Gothic Medium",
                          textAlign: "center",
                        }}
                      >{`₹${product.productRegularPrice}`}</Typography>
                      <Typography
                        className="detailsBlock-3-Typography-discount"
                        style={{
                          color: green[700],
                          font: "400 18px  Franklin Gothic Medium",
                          marginBottom: "1px",
                        }}
                      >{`${discount}% off`}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <Typography variant="body2">Status:</Typography>
                      <Typography
                        variant="body2"
                        className={
                          product.Stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack
                    style={{
                      color: grey[700],
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "1.2em",
                        paddingBottom: ".7em",
                        borderBottom: "1px solid #d1d1d1",
                        margin: "2em 0 .5em",
                        textTransform: "uppercase",
                      }}
                    >
                      Description :
                    </Typography>
                    <Typography variant="subtitle1">
                      A joyful union of almond brittle chocolates in a jute bag,
                      caramel-coated crispy treats, fresh gold limonium, disbud,
                      and kamini stems come together in a woody basket, adding
                      an old-world charm to this marvellous hamper. The sauve
                      striped black & white ribbon makes it more alluring &
                      grand.
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1.1em",
                        paddingBottom: ".7em",
                        borderBottom: "1px solid #d1d1d1",
                        margin: "2em 0 .5em",
                      }}
                    >
                      KEY ATTRIBUTES :
                    </Typography>
                    <Grid container spacing={2}>
                      {descriptionPoints.map((point) => (
                        <Grid item xl={6} style={{ height: "2vmax" }}>
                          <Stack
                            direction={"row"}
                            spacing={2}
                            style={{
                              paddingLeft: "0.8vmax",
                            }}
                          >
                            <Typography variant="h5">{`•`}</Typography>
                            <Typography variant="body">{point}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    <Typography
                      style={{
                        fontSize: "1.1em",
                        paddingBottom: ".7em",
                        borderBottom: "1px solid #d1d1d1",
                        margin: "2em 0 .5em",
                        textTransform: "uppercase",
                      }}
                    >
                      Product specifications :
                    </Typography>
                    <Grid container spacing={2}>
                      {productSpecsPoints.map((point) => (
                        <Grid item xl={12} style={{ height: "2vmax" }}>
                          <Stack
                            direction={"row"}
                            spacing={1}
                            style={{
                              paddingLeft: "0.8vmax",
                            }}
                          >
                            <Typography variant="h5">{`•`}</Typography>
                            <Typography variant="body">{point}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    <Typography
                      style={{
                        fontSize: "1.1em",
                        paddingBottom: ".7em",
                        borderBottom: "1px solid #d1d1d1",
                        margin: "2em 0 .5em",
                      }}
                    >
                      Disclaimer :
                    </Typography>
                    <Grid container spacing={2}>
                      {productDisclaimerPoints.map((point) => (
                        <Grid item xl={12} style={{ height: "2vmax" }}>
                          <Stack
                            direction={"row"}
                            spacing={2}
                            style={{
                              paddingLeft: "0.8vmax",
                            }}
                          >
                            <Typography variant="h5">{`•`}</Typography>
                            <Typography variant="body">{point}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>

                  {/* <StyledButton>
                  <Button className="btn-15">{`Submit Review`}</Button>
                </StyledButton> */}
                  <Box>
                    <Typography
                      style={{
                        fontSize: "1.1em",
                        paddingBottom: ".7em",
                        borderBottom: "1px solid #d1d1d1",
                        margin: "2em 0 .5em",
                      }}
                    >
                      Reviews
                    </Typography>
                    {product && product.reviews && product.reviews[0] ? (
                      product.reviews.map((r) => <ReviewCard review={r} />)
                    ) : (
                      <Box>No reviews</Box>
                    )}
                  </Box>
                </Stack>
              </ImageListItem>
            </ImageList>
            <Stack
              direction={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              spacing={2}
              style={{ width: { xs: 100, sm: 200, md: 400, lg: 580, xl: 580 } }}
            >
              <Button
                variant="contained"
                disabled={product.Stock < 1 ? true : false}
                style={{
                  font: "500 1vmax Roboto",
                  padding: "1vmax",
                  width: "20vmax",
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                disabled={product.Stock < 1 ? true : false}
                style={{
                  font: "500 1vmax Roboto",
                  padding: "1vmax",
                  width: "20vmax",
                }}
              >
                Make it Special
              </Button>
            </Stack>
          </Stack>
        </StyledStack>
      )}
    </>
  );
};

export default ProductDetails;

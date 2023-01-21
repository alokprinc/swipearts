import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner1 from "../../asset/banner1.png";
import Banner2 from "../../asset/img2.jpg";
import Banner3 from "../../asset/img3.jpg";
import SliderCss from "./Slider.css";
const styleImg = {
  width: "50vw",
};

const Slider = () => {
  return (
    <Carousel className="carousel" style={{}}>
      <Carousel.Item>
        <img
          style={styleImg}
          className="d-block w-100"
          src={Banner1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={styleImg}
          className="d-block w-100"
          src={Banner1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={styleImg}
          className="d-block w-100"
          src={Banner1}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;

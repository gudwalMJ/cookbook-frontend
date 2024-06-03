// src/components/slideshow/Slideshow.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slideshow.css";

const Slideshow = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="custom-dots-container">
        <button
          className="custom-arrow slick-prev"
          onClick={() => slider.slickPrev()}
        >
          {"<"}
        </button>
        <div className="custom-dots">{dots}</div>
        <button
          className="custom-arrow slick-next"
          onClick={() => slider.slickNext()}
        >
          {">"}
        </button>
      </div>
    ),
    customPaging: () => <div className="custom-dot"></div>,
  };

  let slider;

  return (
    <Slider ref={(c) => (slider = c)} {...settings}>
      {images.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Slide ${index + 1}`} className="slide-image" />
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;

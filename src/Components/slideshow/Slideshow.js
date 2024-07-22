import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slideshow.css";

const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-arrow custom-prev" onClick={onClick}>
    {"<"}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="custom-arrow custom-next" onClick={onClick}>
    {">"}
  </button>
);

const Slideshow = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div className="custom-dots-container">
        <div className="custom-dots">{dots}</div>
      </div>
    ),
    customPaging: () => <div className="custom-dot"></div>,
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;

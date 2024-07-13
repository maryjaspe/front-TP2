// Carrusel.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrusel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='!flex justify-center'>
            <img src={image} alt={`slide-${index}`} className="h-[400px] mt-[24px]" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrusel;

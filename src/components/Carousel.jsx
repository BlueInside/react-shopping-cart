import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledCarousel, Image } from './styles/Carousel.styled';

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [images.length, currentImageIndex]);

  return (
    <StyledCarousel className="carousel">
      {images &&
        images.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            $isActive={index === currentImageIndex}
            alt="product"
          />
        ))}
    </StyledCarousel>
  );
}

Carousel.propTypes = {
  images: PropTypes.array,
};

Carousel.defaultProp = {
  images: [],
};

export default Carousel;

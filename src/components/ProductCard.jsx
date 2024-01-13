import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import DisplayProductInformation from './DisplayProductInformation';
function ProductCard({ image, price, title, description, rating, category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO implement addToCart
  function handleAddToCart() {
    return;
  }

  function showProductModal() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  // function closeProductModal() {
  //   if (isModalOpen) setIsModalOpen(false);
  // }

  if (isModalOpen) {
    return (
      <DisplayProductInformation
        image={image}
        description={description}
        price={price}
        title={title}
        category={category}
        rating={rating}
        handleAddToCart={handleAddToCart}
      />
    );
  }

  return (
    <div role="productCard">
      <img
        onClick={showProductModal}
        src={image}
        alt="item"
        role="productImage"
      />
      <p onClick={showProductModal} role="productTitle">
        {title}
      </p>
      <p role="productPrice">{price}</p>
      <Button
        role={'addToCart'}
        handleClick={handleAddToCart}
        label={'addToCart'}
      />
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};

ProductCard.defaultProps = {
  image: '#',
};
export default ProductCard;

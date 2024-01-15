import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import DisplayProductInformation from './DisplayProductInformation';
import { addToCard } from '../utils/cart';
function ProductCard({
  product,
  image,
  price,
  title,
  description,
  rating,
  category,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showProductModal() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  if (isModalOpen) {
    return (
      <DisplayProductInformation
        image={image}
        description={description}
        price={price}
        title={title}
        category={category}
        rating={rating}
        handleAddToCart={(product, qty) => addToCard(product, qty)}
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
        handleClick={() => addToCard(product, 1)}
        label={'addToCart'}
      />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};

ProductCard.defaultProps = {
  image: '#',
};
export default ProductCard;

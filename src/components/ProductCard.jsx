import PropTypes from 'prop-types';
import Button from './Button';
import { useState } from 'react';

function ProductCard({ image, price, title, description, onClick }) {
  const [quantity, setQuantity] = useState(0);

  // TODO implement addToCart
  function handleAddToCart() {
    return;
  }

  function handleChange(event) {
    const inputValue = event.target.value;

    if (Number(inputValue)) {
      setQuantity(parseInt(inputValue, 10));
    } else if (!isNaN(inputValue)) {
      setQuantity(0);
    }
  }

  function handleIncrement() {
    setQuantity((q) => q + 1);
  }

  function handleReduce() {
    if (quantity - 1 >= 0) {
      setQuantity((q) => q - 1);
    } else return;
  }

  return (
    <div role="productCard">
      <img onClick={onClick} src={image} alt="item" role="productImage" />
      <p role="productTitle">{title}</p>
      <p role="productPrice">{price}</p>
      <div>
        <Button handleClick={handleIncrement} label={'+'} role="add" />
        <label htmlFor="quantity" />
        <input
          type="number"
          id="quantity"
          role="quantity"
          value={quantity}
          min="0"
          onChange={handleChange}
        />
        <Button handleClick={handleReduce} label={'-'} role={'remove'} />
      </div>
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
  onClick: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  image: '#',
  onClick: () => console.log('click handler not implemented'),
};
export default ProductCard;

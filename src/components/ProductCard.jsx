import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import DisplayProductInformation from './DisplayProductInformation';
function ProductCard({ image, price, title, description, rating, category }) {
  // const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO implement addToCart
  function handleAddToCart() {
    return;
  }

  function showProductModal() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  function closeProductModal() {
    if (isModalOpen) setIsModalOpen(false);
  }

  // function handleChange(event) {
  //   const inputValue = event.target.value;
  //   const numericValue = Number(inputValue);

  //   if (!isNaN(numericValue)) {
  //     setQuantity(parseInt(inputValue, 10));
  //   } else {
  //     setQuantity(quantity);
  //   }
  // }

  // function handleIncrement() {
  //   setQuantity((q) => q + 1);
  // }

  // function handleReduce() {
  //   if (quantity - 1 >= 0) {
  //     setQuantity((q) => q - 1);
  //   } else return;
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
        // quantity={quantity}
        // handleIncrement={handleIncrement}
        // handleReduce={handleReduce}
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
      <div>
        {/* <Button handleClick={handleIncrement} label={'+'} role="add" /> */}
        {/* <label htmlFor="quantity" />
        <input
          type="number"
          id="quantity"
          role="quantity"
          value={quantity}
          min="0"
          onChange={handleChange}
        /> */}
        {/* <Button handleClick={handleReduce} label={'-'} role={'remove'} /> */}
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

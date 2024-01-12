import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
function DisplayProductInformation({
  title,
  price,
  image,
  description,
  category,
  rating,
}) {
  const [quantity, setQuantity] = useState(0);

  function handleChange(event) {
    const inputValue = event.target.value;

    if (Number(inputValue)) {
      setQuantity(parseInt(inputValue, 10));
    } else {
      setQuantity(quantity);
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
    <div role="productModal">
      <div>
        <img src={image} alt="product" role="productImage" />
        <div>
          <div>
            <p role="title">{title}</p>
            {rating && <p role="rating">{rating.rate}</p>}
            <p role="price">{price}</p>
          </div>
          <div className="quantityControllers">
            <Button handleClick={handleIncrement} label={'+'} role="add" />
            <input
              type="number"
              id="quantity"
              role="quantity"
              value={quantity}
              min="0"
              onChange={handleChange}
            />
            <Button handleClick={handleReduce} label={'-'} role={'reduce'} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p role="category">{category}</p>
          <p role="productDescription">{description}</p>
        </div>
      </div>
    </div>
  );
}

DisplayProductInformation.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
};
export default DisplayProductInformation;

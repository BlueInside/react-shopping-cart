import { useState } from 'react';
import Button from './Button';
import useDataFetching from '../hooks/useDataFetching';
import { useParams } from 'react-router-dom';
import { addToCard } from '../utils/cart';
function DisplayProductInformation() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, loading, error } = useDataFetching(productId);

  function handleOnQuantityChange(e) {
    const numericValue = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (e.target.value === '') {
      setQuantity(1);
      return;
    }

    if (!isNaN(numericValue)) {
      setQuantity(numericValue);
    } else {
      setQuantity(1);
    }
  }

  function handleIncrement() {
    setQuantity((q) => q + 1);
  }

  function handleReduce() {
    if (quantity - 1 >= 1) {
      // Min quantity is 1
      setQuantity((q) => q - 1);
    } else return;
  }
  if (loading || !data) return <div>Loading</div>;
  if (error) {
    return <div>Oops! Something went wrong. Please try again later.</div>;
  }
  const { title, image, rating, price, category, description } = data;
  console.log(data);

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

          <div>
            <div className="quantityControllers">
              <Button handleClick={handleIncrement} label={'+'} role="add" />
              <input
                role="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={handleOnQuantityChange}
              />
              <Button handleClick={handleReduce} label={'-'} role={'reduce'} />
            </div>
            <Button
              handleClick={() => addToCard(quantity)}
              role={'addToCart'}
              label={'Add to cart'}
            />
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

// DisplayProductInformation.propTypes = {
//   title: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   description: PropTypes.string,
//   category: PropTypes.string.isRequired,
//   rating: PropTypes.shape({
//     rate: PropTypes.number.isRequired,
//     count: PropTypes.number,
//   }).isRequired,
//   handleAddToCart: PropTypes.func.isRequired,
// };

DisplayProductInformation.defaultProps = {};

export default DisplayProductInformation;

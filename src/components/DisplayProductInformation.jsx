import {
  StyledProductInfoContainer,
  ImageAndControllers,
  PriceQtyContainer,
  QuantityButtons,
  RatingAndPrice,
} from './styles/DisplayProductInformation.styled';
import HorizontalLine from './styles/HorizontalLine.styled';
import { useState } from 'react';
import Button from './Button';
import useDataFetching from '../hooks/useDataFetching';
import { useParams } from 'react-router-dom';
import { addToCard } from '../utils/cart';

function DisplayProductInformation() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, loading, error } = useDataFetching(productId);
  const [flashMessage, setFlashMessage] = useState('');

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
  const { title, image, rating, price, description } = data;

  return (
    <StyledProductInfoContainer role="productContainer">
      <div>{flashMessage && <p>{flashMessage}</p>}</div>

      <ImageAndControllers>
        <img src={image} alt="product" role="productImage" />

        <PriceQtyContainer>
          <RatingAndPrice>
            {rating && (
              <div>
                <p>Rating:</p> <p role="rating">{rating.rate} / 5</p>
              </div>
            )}
            <div>
              <p>Price: </p>
              <p role="price"> ${(price * quantity).toFixed(2)}</p>
            </div>
          </RatingAndPrice>

          <QuantityButtons>
            <Button handleClick={handleReduce} label={'-'} role={'reduce'} />
            <input
              role="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={handleOnQuantityChange}
            />
            <Button handleClick={handleIncrement} label={'+'} role="add" />
          </QuantityButtons>
          <Button
            bg={'#FFC107'}
            handleClick={() => {
              addToCard({ ...data }, quantity);
              setFlashMessage('Product added to cart!');
              setTimeout(() => {
                setFlashMessage('');
              }, 1500);
            }}
            role={'addToCart'}
            label={'Add to cart'}
          />
        </PriceQtyContainer>
      </ImageAndControllers>

      <div>
        <div>
          <p>
            <b>Product:</b>{' '}
          </p>
          <p role="title">{title}</p>
        </div>
      </div>
      <div>
        <div>
          <p>
            <b>Description:</b>
          </p>
          <p role="productDescription">{description}</p>
        </div>
      </div>
      <HorizontalLine />
      <div>
        <p>Other products: </p>
      </div>
    </StyledProductInfoContainer>
  );
}

DisplayProductInformation.defaultProps = {};

export default DisplayProductInformation;

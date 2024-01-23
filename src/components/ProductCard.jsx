import {
  StyledProductCard,
  ProductImg,
  ProductPara,
} from './styles/ProductCard.styled';

import theme from './styles/theme.';
import PropTypes from 'prop-types';
import Button from './Button';
import { addToCard } from '../utils/cart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function ProductCard({ product, image, price, title }) {
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {productAddedToCart && (
        <p role="addToCartFlashMessage">Item added to cart</p>
      )}
      <StyledProductCard role="productCard">
        <div>
          <ProductImg
            onClick={() => navigate(`/shop/products/${product.id}`)}
            src={image}
            alt="item"
            role="productImage"
          />
        </div>
        <ProductPara
          onClick={() => navigate(`/shop/products/${product.id}`)}
          role="productTitle"
        >
          {title}
        </ProductPara>
        <p role="productPrice">${price}</p>
        <Button
          role={'addToCart'}
          bg={theme.colors.primaryYellow}
          hoverColor={'#dbaa17'}
          handleClick={() => {
            addToCard(product, 1);
            setProductAddedToCart(true);
            setTimeout(() => {
              setProductAddedToCart(false);
            }, 1000);
          }}
          label={'Add to cart'}
        />
      </StyledProductCard>
    </>
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

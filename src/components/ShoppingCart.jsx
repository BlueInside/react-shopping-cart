import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
function CartItem({ image, title, price, quantity = 1 }) {
  const [qty, setQty] = useState(quantity);

  function handleAddQty() {
    setQty((qty) => qty + 1);
  }

  function handleRemoveQty() {
    if (qty > 1) setQty((qty) => qty - 1);
  }

  return (
    <div role="cartItem">
      <img src={image} alt="product" role="cartItemImage" />
      <p role="cartItemTitle">{title}</p>
      <p role="cartItemPrice">${price * qty}`</p>
      <div role="quantityControlsContainer">
        <Button role={'add'} label={'add'} handleClick={handleAddQty} />
        <p role="cartItemQuantity">{qty}</p>
        <Button
          role={'remove'}
          label={'remove'}
          handleClick={handleRemoveQty}
        />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number,
};

CartItem.defaultProps = {};
function ShoppingCart({ products }) {
  return (
    <div>
      {products.map((product) => (
        <CartItem
          key={product.id}
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          image={product.image}
        />
      ))}
    </div>
  );
}

ShoppingCart.propTypes = {
  products: PropTypes.array.isRequired,
};

ShoppingCart.defaultProps = {
  products: [],
};
export default ShoppingCart;

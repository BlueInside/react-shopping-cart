import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
function CartItem({ image, title, price, quantity = 1, handleDeleteCartItem }) {
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
      <Button
        label={'Delete Icon'}
        role={'deleteCartItem'}
        handleClick={handleDeleteCartItem}
      />
    </div>
  );
}

CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleDeleteCartItem: PropTypes.func.isRequired,
  quantity: PropTypes.number,
};

CartItem.defaultProps = {};
function ShoppingCart({ products }) {
  const [cartProducts, setCartProducts] = useState(products);

  function handleDeleteCartItem(productId) {
    const updatedArray = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedArray);
  }

  return (
    <div>
      {cartProducts.map((product) => (
        <CartItem
          key={product.id}
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          image={product.image}
          handleDeleteCartItem={() => handleDeleteCartItem(product.id)}
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

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';

function CartItem({
  image,
  title,
  price,
  quantity,
  setQuantity,
  handleDeleteCartItem,
}) {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  function displayConfirmationModal() {
    if (!isConfirmationModalOpen) {
      setConfirmationModalOpen(true);
    }
  }

  function hideConfirmationModal() {
    if (isConfirmationModalOpen) {
      setConfirmationModalOpen(false);
    }
  }

  function onConfirm() {
    handleDeleteCartItem();
    hideConfirmationModal();
  }

  function onCancel() {
    hideConfirmationModal();
  }

  function handleAddQty() {
    setQuantity(quantity + 1);
  }

  function handleRemoveQty() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <div>
      <div role="cartItem">
        <img src={image} alt="product" role="cartItemImage" />
        <p role="cartItemTitle">{title}</p>
        <p role="cartItemPrice">${price * quantity}`</p>
        <div role="quantityControlsContainer">
          <Button role={'addQuantity'} label={'+'} handleClick={handleAddQty} />
          <p role="cartItemQuantity">{quantity}</p>
          <Button
            role={'reduceQuantity'}
            label={'-'}
            handleClick={handleRemoveQty}
          />
        </div>
        <Button
          label={'Delete Icon'}
          role={'deleteCartItem'}
          handleClick={displayConfirmationModal}
        />
      </div>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this item?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleDeleteCartItem: PropTypes.func.isRequired,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func.isRequired,
};

CartItem.defaultProps = {};
function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const storedCartItems = sessionStorage.getItem('cart');

  useEffect(() => {
    storedCartItems
      ? setCartProducts(JSON.parse(storedCartItems))
      : setCartProducts([]);
  }, [storedCartItems]);

  let totalCartPrice = cartProducts.reduce(
    (sum, obj) => sum + obj.price * obj.quantity,
    0
  );
  let roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));
  let isCartEmpty = cartProducts.length < 1 ? true : false;

  function handleDeleteCartItem(productId) {
    const updatedArray = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedArray);
  }
  function updateProductQuantity(productId, newQuantity) {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  }
  if (isCartEmpty) {
    return (
      <p role="emptyCartInfo">
        Your cart is empty. Start shopping to add items!
      </p>
    );
  } else {
    return (
      <div>
        <div>
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              image={product.image}
              setQuantity={(newQuantity) =>
                updateProductQuantity(product.id, newQuantity)
              }
              handleDeleteCartItem={() => handleDeleteCartItem(product.id)}
            />
          ))}
        </div>

        <div>
          <p role="totalCartPrice">Total: {roundedTotalCartPrice}</p>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  products: PropTypes.array.isRequired,
};

ShoppingCart.defaultProps = {
  products: [],
};
export default ShoppingCart;

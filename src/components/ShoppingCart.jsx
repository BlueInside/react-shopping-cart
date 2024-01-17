import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import FlashMessage from './FlashMessage';

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
        <p role="cartItemPrice">${(price * quantity).toFixed(2)}</p>
        <div role="quantityControlsContainer">
          <Button
            role={'reduceQuantity'}
            label={'-'}
            handleClick={handleRemoveQty}
          />
          <p role="cartItemQuantity">{quantity}</p>
          <Button role={'addQuantity'} label={'+'} handleClick={handleAddQty} />
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
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  let storedCartItems = sessionStorage.getItem('cart');

  useEffect(() => {
    try {
      storedCartItems
        ? setCartProducts(JSON.parse(storedCartItems))
        : setCartProducts([]);
    } catch (error) {
      console.log('Failed to parse cart items: ', error);
    }
  }, [storedCartItems]);

  let totalCartPrice = cartProducts.reduce(
    (sum, obj) => sum + obj.price * obj.quantity,
    0
  );
  let roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));
  let isCartEmpty = cartProducts.length < 1 ? true : false;

  function handleCheckout() {
    setCartProducts([]);
    sessionStorage.clear();
    setCheckoutCompleted(true);
  }

  function handleDeleteCartItem(productId) {
    const productToDelete = cartProducts.find(
      (product) => product.id === productId
    );
    if (productToDelete) {
      const updatedArray = cartProducts.filter(
        (product) => product.id !== productId
      );
      sessionStorage.setItem('cart', JSON.stringify(updatedArray));
      setCartProducts(updatedArray);
    } else {
      console.error(`Product with id ${productId} not found.`);
    }
  }

  function updateProductQuantity(productId, newQuantity) {
    // Check if theres product to update
    const productToUpdate = cartProducts.find(
      (product) => product.id === productId
    );
    if (productToUpdate) {
      setCartProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );
    }
  }
  if (isCartEmpty) {
    return (
      <>
        {checkoutCompleted && (
          <FlashMessage text={'Thank you for purchase!'} timer={2000} />
        )}
        <p role="emptyCartInfo">
          Your cart is empty. Start shopping to add items!
        </p>
      </>
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
        <div>
          <Button
            role={'checkout'}
            label={'Checkout'}
            handleClick={handleCheckout}
          />
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {};

ShoppingCart.defaultProps = {};
export default ShoppingCart;

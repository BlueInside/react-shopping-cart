import { useState } from 'react';
import ShopPage from './ShopPage';
import ShoppingCart from './ShoppingCart';
function Cart() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    if (!product.quantity) product = { ...product, quantity: 1 };
    setCartItems((prevItems) => [...prevItems, product]);
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  function updateProductQuantity(productId, newQuantity) {
    setCartItems((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  }
  return (
    <>
      <ShopPage addToCart={addToCart} />
      <ShoppingCart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    </>
  );
}

export default Cart;

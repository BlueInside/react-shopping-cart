import PropTypes from 'prop-types';

function CartItem({ image, title, price, quantity = 1 }) {
  return (
    <div role="cartItem">
      <img src={image} alt="product" role="cartItemImage" />
      <p role="cartItemTitle">{title}</p>
      <p role="cartItemPrice">${price * quantity}`</p>
      <p role="cartItemQuantity">Quantity: {quantity}</p>
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

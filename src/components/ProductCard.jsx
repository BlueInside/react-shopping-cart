import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import DisplayProductInformation from './DisplayProductInformation';
function ProductCard({
  product,
  image,
  price,
  title,
  description,
  rating,
  category,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddToCart(qty = 1) {
    // Create shallow copy of product object
    const newProduct = { ...product, quantity: qty };

    // Gets cart Array from session storage
    const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart'));
    if (sessionStorageCart) {
      // Checks if item already is in cart
      const existingProduct = sessionStorageCart.find(
        (p) => p.id === newProduct.id
      );
      if (existingProduct) {
        // If item is in array just increase its quantity by one
        existingProduct.quantity += qty;
      } else {
        // Otherwise add item to cart Array
        sessionStorageCart.push(newProduct);
      }

      // If theres cart save in session storage update cart
      sessionStorage.setItem('cart', JSON.stringify(sessionStorageCart));
    } else {
      // Create new cart array in session storage
      sessionStorage.setItem('cart', JSON.stringify([newProduct]));
    }
  }

  function showProductModal() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  // function closeProductModal() {
  //   if (isModalOpen) setIsModalOpen(false);
  // }

  if (isModalOpen) {
    return (
      <DisplayProductInformation
        image={image}
        description={description}
        price={price}
        title={title}
        category={category}
        rating={rating}
        handleAddToCart={(qty) => handleAddToCart(qty)}
      />
    );
  }

  return (
    <div role="productCard">
      <img
        onClick={showProductModal}
        src={image}
        alt="item"
        role="productImage"
      />
      <p onClick={showProductModal} role="productTitle">
        {title}
      </p>
      <p role="productPrice">{price}</p>
      <Button
        role={'addToCart'}
        handleClick={() => handleAddToCart(1)}
        label={'addToCart'}
      />
    </div>
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

import PropTypes from 'prop-types';

function ProductCard({ image, title }) {
  return (
    <div role="productCard">
      <img src={image} alt="item" role="productImage" />
      <p role="productTitle">{title}</p>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  image: '#',
};
export default ProductCard;

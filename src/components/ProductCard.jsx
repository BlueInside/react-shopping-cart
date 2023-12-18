import PropTypes from 'prop-types';
import Button from './Button';
function ProductCard({ image, title, description, onClick }) {
  return (
    <div role="productCard">
      <img onClick={onClick} src={image} alt="item" role="productImage" />
      <p role="productTitle">{title}</p>
      <Button handleClick={handleClick} label={'+'} role="add" />
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  image: '#',
  onClick: () => console.log('click handler not implemented'),
};
export default ProductCard;

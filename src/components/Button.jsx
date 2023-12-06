import PropTypes from 'prop-types';

function Button({ label, handleClick }) {
  return <button onClick={handleClick}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  label: 'button',
  handleClick: () => console.log('No handleClick prop Provided'),
};

export default Button;

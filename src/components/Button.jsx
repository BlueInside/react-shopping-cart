import PropTypes from 'prop-types';

function Button({ label, handleClick, role }) {
  return (
    <button onClick={handleClick} role={role}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  role: PropTypes.string,
};

Button.defaultProps = {
  label: 'button',
  handleClick: () => console.log('No handleClick prop Provided'),
};

export default Button;

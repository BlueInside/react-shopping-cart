import PropTypes from 'prop-types';
import StyledButton from './styles/Button.styled';
function Button({ label, handleClick, role }) {
  return (
    <StyledButton onClick={handleClick} role={role}>
      {label}
    </StyledButton>
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

import PropTypes from 'prop-types';
import StyledButton from './styles/Button.styled';

function Button({ label, handleClick, role, bg, hoverColor, border = false }) {
  return (
    <StyledButton
      $hoverColor={hoverColor}
      $bg={bg}
      onClick={handleClick}
      role={role}
      $border={border}
    >
      {label}{' '}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  role: PropTypes.string,
  border: PropTypes.bool,
  bg: PropTypes.string,
  hoverColor: PropTypes.string,
};

Button.defaultProps = {
  label: 'button',
  handleClick: () => console.log('No handleClick prop Provided'),
};

export default Button;

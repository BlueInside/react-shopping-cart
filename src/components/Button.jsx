import PropTypes from 'prop-types';
import StyledButton from './styles/Button.styled';

function Button({
  label,
  handleClick,
  role,
  bg,
  hoverColor,
  border = false,
  children,
}) {
  return (
    <StyledButton
      $hoverColor={hoverColor}
      $bg={bg}
      onClick={handleClick}
      role={role}
      $border={border}
    >
      {label} {children}
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
  children: PropTypes.node,
};

Button.defaultProps = {
  label: '',
  handleClick: () => console.log('No handleClick prop Provided'),
};

export default Button;

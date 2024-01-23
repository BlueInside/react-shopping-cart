import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import StyledFlashMessage from './styles/FlashMessage.styled';
function FlashMessage({ text }) {
  const [display, setDisplay] = useState(true);
  const timer = 1000;

  useEffect(() => {
    let id;
    id = setTimeout(() => {
      setDisplay(false);
    }, timer);
    return () => clearTimeout(id);
  }, []);
  return (
    <div>
      <StyledFlashMessage open={display} role="flashMessage">
        {text}
      </StyledFlashMessage>
    </div>
  );
}

FlashMessage.defaultProps = {
  text: '',
};

FlashMessage.propTypes = {
  text: PropTypes.string,
  timer: PropTypes.number,
};

export default FlashMessage;

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import StyledFlashMessage from './styles/FlashMessage.styled';
function FlashMessage({ text, timer }) {
  const [message, setMessage] = useState(text);

  useEffect(() => {
    let id;
    id = setTimeout(() => {
      setMessage('');
    }, timer);
    return () => clearTimeout(id);
  }, [timer]);
  return (
    <div>
      <StyledFlashMessage role="flashMessage">{message}</StyledFlashMessage>
    </div>
  );
}

FlashMessage.defaultProps = {
  text: '',
  timer: 40000000, // default to 3 seconds
};

FlashMessage.propTypes = {
  text: PropTypes.string,
  timer: PropTypes.number,
};

export default FlashMessage;

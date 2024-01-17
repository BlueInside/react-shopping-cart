import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
      <p role="flashMessage">{message}</p>
    </div>
  );
}

FlashMessage.defaultProps = {
  text: '',
  timer: 3000, // default to 3 seconds
};

FlashMessage.propTypes = {
  text: PropTypes.string,
  timer: PropTypes.number,
};

export default FlashMessage;

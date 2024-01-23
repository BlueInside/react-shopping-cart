import { StyledConfirmationModal } from './styles/Confirmation.styled';
import Button from './Button';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

function ConfirmationModal({ message, onConfirm, onCancel }) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onCancel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);
  return (
    <StyledConfirmationModal ref={ref} role="confirmationModal">
      <p role="modalMessage">{message}</p>
      <div role="confirmationButtons">
        <Button handleClick={onCancel} label={'Cancel'} role={'cancelButton'} />

        <Button
          handleClick={onConfirm}
          label={'Confirm'}
          role={'confirmButton'}
        />
      </div>
    </StyledConfirmationModal>
  );
}

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;

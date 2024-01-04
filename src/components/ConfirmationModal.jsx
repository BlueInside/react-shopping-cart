import Button from './Button';
import PropTypes from 'prop-types';

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div role="confirmationModal">
      <p role="modalMessage">{message}</p>
      <div role="confirmationButtons">
        <Button
          handleClick={onConfirm}
          label={'Confirm'}
          role={'confirmButton'}
        />
        <Button handleClick={onCancel} label={'Cancel'} role={'cancelButton'} />
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;

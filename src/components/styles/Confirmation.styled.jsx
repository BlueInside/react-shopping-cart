import styled from 'styled-components';

const StyledConfirmationModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    display: flex;
    gap: 10px;
  }

  p {
    color: #dc3545;
    font-weight: bold;
  }
`;

export { StyledConfirmationModal };

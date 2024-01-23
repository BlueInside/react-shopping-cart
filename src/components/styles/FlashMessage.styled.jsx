import styled from 'styled-components';

const StyledFlashMessage = styled.p`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 6px 44px;
  border-radius: 50px;
  font-size: 21px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.show {
    opacity: 1;
  }
`;

export default StyledFlashMessage;

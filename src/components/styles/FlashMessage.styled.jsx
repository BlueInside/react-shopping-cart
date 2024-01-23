import styled, { keyframes } from 'styled-components';
const moveUp = keyframes`
    from{bottom: 10px;}
    to{bottom: 150px;}
`;
const StyledFlashMessage = styled.span`
  position: fixed;
  bottom: 10px;
  left: 50%;
  translate: -50% 0;
  background-color: #28a745;
  color: white;
  padding: 6px 44px;
  border-radius: 50px;
  font-size: 21px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: opacity 0.5s ease;
  animation: ${moveUp} 2s linear;
`;

export default StyledFlashMessage;

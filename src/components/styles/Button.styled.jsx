import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px;
  border: ${(props) => (props.$border ? '2px solid black' : 'none')};
  background-color: ${(props) => props.$bg || props.theme.colors.primaryBlue};
  color: white;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
    cursor: pointer;
    background-color: ${(props) =>
      props.$hoverColor ? props.$hoverColor : '#0056b3'};
  }
`;

export default StyledButton;

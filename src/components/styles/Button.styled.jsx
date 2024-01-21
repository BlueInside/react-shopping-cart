import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${(props) => props.bg || props.theme.colors.primaryBlue};
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
  }
`;

export default StyledButton;

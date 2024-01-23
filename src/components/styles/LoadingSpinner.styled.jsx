import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg)
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  left: 0px;
  right: 0px;
  top: 40vh;
  text-align: center;
  position: absolute;
  border: 8px solid ${({ theme }) => theme.colors.secondaryDarkGrey};
  border-top-color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

export default LoadingSpinner;

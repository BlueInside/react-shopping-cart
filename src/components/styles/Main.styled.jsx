import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin: 30px;

  h1 {
    font-size: 40px;
  }
  button {
    background-color: #007bff;
    color: #ffffff;
    font-family: 'Lato', sans-serif;
    font-size: 30px;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
export { StyledMain };

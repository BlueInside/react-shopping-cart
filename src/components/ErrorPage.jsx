import { Link } from 'react-router-dom';
import { SadIcon } from './styles/ShoppingCart.styled';

import styled from 'styled-components';

const StyledErrorContainer = styled.div`
  transform: translateX(-50%);
  position: absolute;
  top: 30%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 21px;
  text-align: center;
`;

function ErrorPage() {
  return (
    <StyledErrorContainer>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <SadIcon />
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </StyledErrorContainer>
  );
}

export default ErrorPage;

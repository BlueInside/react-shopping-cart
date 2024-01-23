import styled from 'styled-components';
import { Bin } from '@styled-icons/icomoon/Bin';
import { Sad } from '@styled-icons/boxicons-regular/Sad';
import theme from './theme.';

const StyledCartItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  img {
    height: 100px;
    width: 100px;
    @media (max-width: ${theme.mobile}) {
      height: 50px;
      width: 50px;
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.p`
  width: 200px;
`;

const Price = styled.p`
  width: 70px;
`;

const Remove = styled(Bin)`
  color: #f8f9fa;
  height: 25px;
  width: 25px;
`;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 40px 10px;
`;

const EmptyCartMessage = styled.div`
  max-width: fit-content;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 19px;
  text-align: center;
`;

const SadIcon = styled(Sad)`
  width: 250px;
  height: 250px;
  color: #6c757d;
`;

export {
  StyledCartItem,
  Quantity,
  Title,
  Price,
  Remove,
  Checkout,
  EmptyCartMessage,
  SadIcon,
};

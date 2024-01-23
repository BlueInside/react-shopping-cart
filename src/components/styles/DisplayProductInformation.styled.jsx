import styled from 'styled-components';

const StyledProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  img {
    height: 50vh;
    object-fit: contain;
  }
  p {
    font-size: large;
  }
`;

const ImageAndControllers = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const PriceQtyContainer = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const QuantityButtons = styled.div`
  display: flex;
  gap: 4px;
  input {
    width: 40px;
  }
`;

const RatingAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export {
  StyledProductInfoContainer,
  ImageAndControllers,
  PriceQtyContainer,
  QuantityButtons,
  RatingAndPrice,
};

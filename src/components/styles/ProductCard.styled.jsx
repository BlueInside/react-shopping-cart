import styled from 'styled-components';

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 350px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 30px;
  font-size: 20px;

  p {
    max-width: 290px;
  }

  button {
    width: 170px;
    height: 50px;
    border-radius: 5px;
  }
`;

const ProductImg = styled.img`
  cursor: pointer;
`;

const ProductPara = styled.p`
  cursor: pointer;
`;

export { StyledProductCard, ProductImg, ProductPara };

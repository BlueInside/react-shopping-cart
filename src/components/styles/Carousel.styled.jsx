import styled from 'styled-components';

const StyledCarousel = styled.div`
  text-align: center;
  max-width: 100%;
  height: 70vh;

  img {
    max-width: 100%;
    height: 70vh;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
`;

const Image = styled.img`
  opacity: ${(props) => (props.$isActive ? '1' : '0')};
  max-width: 100%;
  height: auto;
  transition: opacity 1s ease-in-out;
`;
export { StyledCarousel, Image };

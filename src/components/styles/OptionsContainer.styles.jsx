import styled from 'styled-components';

const OptionsContainer = styled.div`
  transform: ${(props) => (props.open ? 'scaleY(1)' : 'scaleY(0)')};
  max-height: ${(props) => (props.open ? '200px' : '0px')};
  transform-origin: top;
  transition: transform 0.3s ease-in;
  transition: max-height 0.2s ease-in;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 2px;
  }
`;

export { OptionsContainer };

import styled from 'styled-components';
import FilterDropdown from '../FilterDropdown';
const StyledShopPage = styled.div``;

const StyledFilterDropdown = styled(FilterDropdown)`
  position: relative;
  right: 10px;
  top: 0;
  max-width: 200px;
  display: flex;
  color: black;
  flex-direction: column;
  align-items: stretch;
  margin-left: auto;
  margin-top: 20px;
`;

const ProductsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-around;

  img {
    max-width: 100%;
    height: 210px;
  }
`;

export { StyledShopPage, StyledFilterDropdown, ProductsDisplay };

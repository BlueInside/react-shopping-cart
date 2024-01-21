import styled from 'styled-components';

const StyledNavbar = styled.nav`
  background-color: ${(props) => props.theme.colors.primaryBlue};
  ol {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
  }

  li {
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.offWhite};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    a {
      text-decoration: none;
      color: white;
      font-size: 1.3rem;
    }

    &:hover {
      cursor: pointer;
      background-color: #0056b3;
    }
  }
`;
export { StyledNavbar };

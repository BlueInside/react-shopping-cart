import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledNavbar } from './styles/Navbar.styled';
function Navbar({ links }) {
  return (
    <>
      <StyledNavbar>
        <ol>
          {Array.isArray(links) &&
            links.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
        </ol>
      </StyledNavbar>
    </>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  itemsCount: PropTypes.number,
};

Navbar.defaultProps = {
  links: [],
};
export default Navbar;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ links, itemsCount }) {
  return (
    <>
      <nav>
        <ol>
          {Array.isArray(links) &&
            links.map((link, index) => (
              <li key={index}>
                <div>
                  <Link to={link.path}>{link.label}</Link>
                  {link.label === 'Cart' && (
                    <span role="navCartItems">{itemsCount}</span>
                  )}
                </div>
              </li>
            ))}
        </ol>
      </nav>
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

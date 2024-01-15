import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ links }) {
  return (
    <>
      <nav>
        <ol>
          {Array.isArray(links) &&
            links.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
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
};

Navbar.defaultProps = {
  links: [],
};
export default Navbar;

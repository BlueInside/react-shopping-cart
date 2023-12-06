import PropTypes from 'prop-types';

function Navbar({ links }) {
  return (
    <>
      <nav>
        <ol>
          {Array.isArray(links) &&
            links.map((link) => (
              <li key={link.id}>
                <a href={link.path}>{link.label}</a>
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
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

Navbar.defaultProps = {
  links: [],
};
export default Navbar;

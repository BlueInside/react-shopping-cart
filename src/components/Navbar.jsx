import PropTypes from 'prop-types';

function Navbar({ links }) {
  return (
    <>
      <nav>
        <ol>
          {links.map((link) => (
            <li key={link.id}>{link.label}</li>
          ))}
        </ol>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  links: PropTypes.array.isRequired,
};

Navbar.defaultProps = {
  links: [],
};
export default Navbar;

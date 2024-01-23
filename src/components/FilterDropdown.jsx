import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { OptionsContainer } from './styles/OptionsContainer.styles';

function FilterDropdown({ className, setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  // Closes dropdown when clicked outside component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleDropdownItemClick(option) {
    setSortOption(option);

    toggleDropdown();
  }
  return (
    <div className={className} open={!isOpen} ref={ref} role={'dropdownContainer'}>
      <Button
        border
        role={'filter'}
        aria-label={'Sort options'}
        label={'Sort by...'}
        handleClick={toggleDropdown}
      />
      {/* {isOpen && ( */}
      <OptionsContainer open={isOpen} role="dropdownOptionsContainer">
        <Button
          border
          role={'filterOption'}
          label={'A-Z'}
          handleClick={() => handleDropdownItemClick('az')}
        />
        <Button
          border
          role={'filterOption'}
          label={'Z-A'}
          handleClick={() => handleDropdownItemClick('za')}
        />
        <Button
          border
          role={'filterOption'}
          label={'Price: Low-High'}
          handleClick={() => handleDropdownItemClick('lowHigh')}
        />
        <Button
          border
          role={'filterOption'}
          label={'Price: High-Low'}
          handleClick={() => handleDropdownItemClick('highLow')}
        />
      </OptionsContainer>
      {/* )} */}
    </div>
  );
}

FilterDropdown.propTypes = {
  setSortOption: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FilterDropdown;

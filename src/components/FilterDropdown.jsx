import { useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

function FilterDropdown({ setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleDropdownItemClick(option) {
    setSortOption(option);

    toggleDropdown();
  }
  return (
    <div role={'dropdownContainer'}>
      <div>
        <Button
          role={'filter'}
          aria-label={'Sort options'}
          label={'Sort by...'}
          handleClick={toggleDropdown}
        />
        {isOpen && (
          <div role="dropdownOptionsContainer">
            <div>
              <Button
                role={'filterOption'}
                label={'A-Z'}
                handleClick={() => handleDropdownItemClick('az')}
              />
            </div>
            <div>
              <Button
                role={'filterOption'}
                label={'Z-A'}
                handleClick={() => handleDropdownItemClick('za')}
              />
            </div>
            <div>
              <Button
                role={'filterOption'}
                label={'Price: Low-High'}
                handleClick={() => handleDropdownItemClick('lowHigh')}
              />
            </div>
            <div>
              <Button
                role={'filterOption'}
                label={'Price: High-Low'}
                handleClick={() => handleDropdownItemClick('highLow')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

FilterDropdown.propTypes = {
  setSortOption: PropTypes.func.isRequired,
};

export default FilterDropdown;

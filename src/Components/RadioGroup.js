import React, { useState } from 'react';

const RadioGroup = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleSelect(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
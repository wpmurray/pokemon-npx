import React, { useState } from 'react';
import styled from 'styled-components';

type PokemonType = {
  label: string;
  value: string;
}

type Props = {
  options?: PokemonType[];
  defaultOption?: PokemonType;
  onChange?: (selectedOption: PokemonType) => void;
};

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid gray;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid gray;
  background-color: white;
  z-index: 1;
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const Dropdown: React.FC<Props> = ({ options = [], defaultOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || (options.length > 0 ? options[0] : null));

  const handleOptionClick = (option: PokemonType) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={handleHeaderClick}>
        {selectedOption?.label}
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

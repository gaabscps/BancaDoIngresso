/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

// react-select with props typescript types
import Select from 'react-select';

interface OptionProps {
  value: string;
  label: string;
}

interface SelectAutoCompleteProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionProps[];
  placeholder?: string;
}

interface StyleProps {
  style?: React.CSSProperties;
}

const SelectAutoComplete = (props: SelectAutoCompleteProps) => {
  // const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      // width: '546px',
      height: '62px',
      borderRadius: '5px',
      backgroundColor: '#E6E6E6',
      border: 'none',
      ...(props.style as StyleProps),
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      height: '2.625rem',
      padding: '1px 12px',
    }),

    input: (provided: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '30px',
      margin: 'auto 0',
    }),
  };

  return (
    <>
      <Select
        onChange={props.onChange}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        name={props.name}
        id={props.name}
        options={props.options}
        styles={customStyles}
        placeholder={props.placeholder}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
      />
    </>
  );
};

export default SelectAutoComplete;

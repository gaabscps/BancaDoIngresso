/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

// react-select with props typescript types
import Select, { SingleValue, ActionMeta } from 'react-select';
import { customStyles } from './style';

interface OptionProps {
  value: string | number;
  label: string;
}

interface SelectAutoCompleteProps {
  name: string;
  label?: any;
  error?: any;
  onChange?: (newValue: SingleValue<OptionProps>, actionMeta: ActionMeta<OptionProps>) => void;
  options: OptionProps[] | any;
  placeholder?: string;
  style?: React.CSSProperties;
  wrapperClass?: string;
  control?: any;
}

const SelectAutoComplete = (props: SelectAutoCompleteProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <div className={`mb-4 flex-column ${props.wrapperClass}`}>
        {props.label && (
          <label htmlFor={props.name} className="input-label">
            {props.label}
          </label>
        )}
        <Controller
          name={props.name}
          control={props.control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <Select
              options={props.options}
              placeholder={props.placeholder}
              onChange={isValue => onChange(isValue.value)}
              onBlur={onBlur}
              styles={customStyles()}
              noOptionsMessage={() => 'Nenhum resultado encontrado'}
              value={props.options.find((option: OptionProps) => option.value === value)}
              ref={ref}
            />
          )}
        />
        {props.error && (
          <span role="alert" className="alert-error">
            {props.error}
          </span>
        )}
      </div>
    </>
  );
};

export default SelectAutoComplete;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

// react-select with props typescript types
import Select, { SingleValue, ActionMeta } from 'react-select';
import { customStyles } from './style';

interface OptionProps {
  value?: string | number;
  label: string;
}

interface SelectAutoCompleteProps {
  name: string;
  label?: any;
  error?: any;
  onChange?: (newValue: SingleValue<OptionProps>, actionMeta: ActionMeta<OptionProps>) => void;
  value: string;
  options: OptionProps[];
  placeholder?: string;
  style?: React.CSSProperties;
  wrapperClass?: string;
  control?: any;
  defaultValue?: OptionProps;
  onBlur?: () => void;
  ref?: any;
}

export const SelectCustom = (props: SelectAutoCompleteProps) => {
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
        <Select
          options={props.options}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          styles={customStyles()}
          noOptionsMessage={() => 'Nenhum resultado encontrado'}
          value={props.options.find((option: OptionProps) => option.value === props.value)}
          defaultValue={props.defaultValue}
          ref={props.ref}
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

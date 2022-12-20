/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

// react-select with props typescript types
import { SingleValue, ActionMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { customStyles } from './style';

interface OptionProps {
  value?: string | number;
  label: string;
  target?: HTMLInputElement;
}

export interface SelectAutoCompleteProps {
  name: string;
  label?: any;
  error?: any;
  onChange?: (newValue: SingleValue<OptionProps>, actionMeta: ActionMeta<OptionProps>) => void;
  value: string | undefined;
  options: OptionProps[];
  placeholder?: string;
  id?: string;
  style?: React.CSSProperties;
  wrapperClass?: string;
  control?: any;
  defaultValue?: OptionProps;
  onBlur?: () => void;
  refSelect?: any;
  disabled?: boolean;
  isClearable?: boolean;
  noPadding?: boolean;
}

export const SelectCreateable = (props: SelectAutoCompleteProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <div
        className={`w-100 flex-column input-component ${props.wrapperClass} ${
          props.disabled ? 'input-disabled' : ''
        } ${props.error ? 'input-error' : ''}`}
        style={props.noPadding ? { marginBottom: '0px' } : {}}
      >
        {props.label && (
          <label htmlFor={props.name} className="input-label">
            {props.label}
          </label>
        )}
        <CreatableSelect
          options={props.options}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          styles={customStyles(props)}
          noOptionsMessage={() => 'Nenhum resultado encontrado'}
          value={props.options.find((option: OptionProps) => option.value === props.value)}
          isDisabled={props.disabled}
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

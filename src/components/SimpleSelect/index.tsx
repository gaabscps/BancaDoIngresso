/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import './styles.scss';

// react-select with props typescript types
import Select, { SingleValue, ActionMeta } from 'react-select';
import { customStyles } from './style';

interface OptionProps {
  value?: string | number;
  label: string;
  target?: HTMLInputElement;
}

interface SimpleSelectProps {
  name: string;
  label?: string;
  error?: string;
  onChange?: (newValue: SingleValue<OptionProps>, actionMeta: ActionMeta<OptionProps>) => void;
  value: number | { pageSize: number };
  options: OptionProps[];
  placeholder?: string;
  id?: string;
  style?: React.CSSProperties;
  wrapperClass?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  defaultValue?: OptionProps;
  onBlur?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

export const SimpleSelect = (props: SimpleSelectProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <div className={`flex-column ${props.wrapperClass}`}>
        {props.label && (
          <label htmlFor={props.name} className="pagination-change-label">
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
          isSearchable={false}
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

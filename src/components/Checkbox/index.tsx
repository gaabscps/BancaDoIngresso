/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import './styles.scss';

interface CheckboxProps {
  name: string;
  label?: string;
  wrapperClass?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  error?: string;
  disabled?: boolean;
  value?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  wrapperClass,
  onChange,
  checked,
  error,
  disabled,
  value,
}) => (
  <div className={`mb-4 d-flex ${wrapperClass}`}>
    <label className="checkbox style-d" htmlFor={name}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      <div className="checkbox__checkmark" />
    </label>
    {label && (
      <div className="d-flex ml-3">
        <label htmlFor={name} className="input-checkbox-label m-0">
          {label}
        </label>
        {error && (
          <span role="alert" className="alert-error">
            {error}
          </span>
        )}
      </div>
    )}
  </div>
);

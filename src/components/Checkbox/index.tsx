/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, InputHTMLAttributes } from 'react';
import './styles.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  wrapperClass?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  name,
  wrapperClass,
  onChange,
  checked,
  error,
  disabled,
}) => (
  <div className={`mb-4 ${wrapperClass}`}>
    {label && (
      <div className="d-flex flex-column-reverse">
        <label htmlFor={name} className="input-label m-0">
          {label}
        </label>
        {error && (
          <span role="alert" className="alert-error">
            {error}
          </span>
        )}
      </div>
    )}
    <br />
    <label className="checkbox style-d" htmlFor={name}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="checkbox__checkmark" />
    </label>
  </div>
);

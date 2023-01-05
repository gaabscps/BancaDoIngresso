/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: any;
  error?: any;
  register?: any;
  wrapperClass?: string;
  className?: string;
  icon?: any;
  options?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OptionProps {
  value: string;
  label: string;
}

export const Radio: FC<RadioProps> = ({
  name,
  error,
  label,
  wrapperClass,
  icon,
  options,
  onChange,
  value,
}) => (
  <div className={`mb-4 flex-column ${wrapperClass}`}>
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
    <div className="d-flex flex-column radio radio-custom">
      {options.map((option: OptionProps) => {
        const idRandom = Math.random().toString(36).substr(2, 9);
        return (
          <React.Fragment key={option.value}>
            <input
              type="radio"
              name={name}
              id={`${option.value}-${idRandom}`}
              value={option.value}
              onChange={onChange}
              className="form-check-input"
              checked={String(option.value) === value}
            />
            <label
              key={option.value}
              htmlFor={`${option.value}-${idRandom}`}
              className="input-label radio-label"
            >
              {option.label}
            </label>
          </React.Fragment>
        );
      })}
    </div>
    {icon}
  </div>
);

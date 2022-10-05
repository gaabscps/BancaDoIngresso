import React, { FC, InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: React.ReactNode | string;
  error?: string | null | undefined;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean | undefined;
}

export const Switch: FC<SwitchProps> = ({
  name,
  onChange,
  label,
  required,
  disabled,
  checked,
  wrapperClass,
  error,
}) => {
  const displayStyle = checked ? 'switch-success' : 'switch-danger';
  return (
    <div className={`mb-2 flex-column ${wrapperClass} ${checked === false ? 'disabled' : ''}`}>
      <label className="d-flex justify-content-between" htmlFor={name}>
        <label className="mr-2 w-100 text-right">{label}</label>
        <span className={`switch-wrapper`}>
          <input
            type="checkbox"
            id={name}
            name={name}
            onChange={onChange}
            required={required}
            disabled={disabled}
            checked={checked}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
      </label>
      {error && (
        <span role="alert" className="alert-error position-relative text-sm mb-2">
          {error}
        </span>
      )}
    </div>
  );
};

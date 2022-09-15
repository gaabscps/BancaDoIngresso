import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'time' | 'datetime-local';
  label?: React.ReactNode | string;
  error?: string | null | undefined;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  renderForward?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: FC<InputProps> = ({
  name,
  type = 'text',
  value,
  placeholder,
  error,
  label,
  maxLength,
  onBlur,
  onChange,
  wrapperClass,
  renderForward,
}) => (
  <div className={`mb-4 flex-column ${wrapperClass}`}>
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <input
      aria-invalid={error ? 'true' : 'false'}
      type={type}
      value={value}
      placeholder={placeholder ?? 'Digite aqui'}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={onChange}
      className={` form-control input-default ${error ? 'input-error' : ''}`}
    />
    {renderForward}
    {error && (
      <span role="alert" className="alert-error">
        {error}
      </span>
    )}
  </div>
);

import React, { FC, InputHTMLAttributes, LegacyRef } from 'react';

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
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  refInput?: LegacyRef<HTMLInputElement>;
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
  onFocus,
  onChange,
  wrapperClass,
  className,
  renderForward,
  disabled,
  refInput,
}) => {
  const isDisabled = disabled ? 'input-disabled' : '';
  const isError = error ? 'input-error' : '';

  return (
    <div className={`${isDisabled} flex-column input-component ${wrapperClass} ${isError}`}>
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
        ref={refInput}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        className={`form-control input-default ${isError} ${className} ${
          type === 'date' ? 'text-uppercase' : ''
        } ${value === '' ? 'text-black-50' : ''}`}
        disabled={disabled}
        {...(type === 'date' ? { max: '9999-12-31' } : {})}
      />
      {renderForward}
      {error && (
        <span role="alert" className="alert-error position-relative text-sm mb-2">
          {error}
        </span>
      )}
    </div>
  );
};

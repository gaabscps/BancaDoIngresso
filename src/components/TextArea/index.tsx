import React, { FC, InputHTMLAttributes } from 'react';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;
  label?: React.ReactNode | string;
  error?: string | null | undefined;
  rows?: number;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  renderForward?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  value,
  placeholder,
  error,
  label,
  maxLength,
  rows,
  onBlur,
  onChange,
  wrapperClass,
  renderForward,
  disabled,
}) => (
  <div
    className={`flex-column input-component ${wrapperClass} ${disabled ? 'input-disabled' : ''} ${
      error ? 'input-error' : ''
    }`}
  >
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <textarea
      aria-invalid={error ? 'true' : 'false'}
      value={value}
      placeholder={placeholder ?? 'Digite aqui'}
      maxLength={maxLength}
      rows={rows}
      onBlur={onBlur}
      onChange={onChange}
      className={` form-control text-area-component ${error ? 'input-error' : ''}`}
      disabled={disabled}
    />
    {renderForward}
    {error && (
      <span role="alert" className="alert-error position-relative text-sm mb-2">
        {error}
      </span>
    )}
  </div>
);

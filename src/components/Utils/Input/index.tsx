import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: any;
  error?: any;
  register?: any;
  wrapperClass?: string;
  className?: string;
  icon?: any;
}

const Input: FC<InputProps> = ({ register, name, error, label, wrapperClass, icon, ...rest }) => (
  <div className={`mb-4 flex-column ${wrapperClass}`}>
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <input
      aria-invalid={error ? 'true' : 'false'}
      {...register(name)}
      {...rest}
      className={` form-control input-default ${error ? 'input-error' : ''}`}
    />
    {icon}
    {error && (
      <span role="alert" className="alert-error">
        {error}
      </span>
    )}
  </div>
);

export default Input;

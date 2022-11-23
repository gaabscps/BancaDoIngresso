import React, { FC, LegacyRef } from 'react';

interface RadioProps {
  name: string;
  label?: any;
  error?: any;
  wrapperClass?: string;
  className?: string;
  icon?: any;
  options?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  refButton?: LegacyRef<HTMLInputElement>;
}

interface OptionProps {
  value: string;
  label: string;
}

export const ButtonGroup: FC<RadioProps> = ({
  name,
  error,
  label,
  wrapperClass,
  icon,
  options,
  onChange,
  value,
  disabled,
  refButton,
}) => {
  const isError = error ? 'input-error' : '';

  return (
    <div className={`flex-column mb-4 ${wrapperClass} ${isError}`}>
      {label && (
        <div className="d-flex flex-column-reverse">
          <label htmlFor={name} className={`input-label ${disabled ? 'disable-text' : ''}`}>
            {label}
          </label>
        </div>
      )}
      <div className={`${disabled ? 'input-action-disabled' : ''}`}>
        <div className={`btn-group ${isError}`} role="group">
          {options.map((option: OptionProps) => {
            const idRandom = Math.random().toString(36).substr(2, 9);
            return (
              <React.Fragment key={option.value}>
                <input
                  type="radio"
                  className="btn-check radio-button-gruop"
                  value={String(option.value)}
                  checked={String(option.value) === value}
                  onChange={onChange}
                  name={name}
                  id={`${option.value}-${idRandom}`}
                  ref={refButton}
                  disabled={disabled}
                />
                <label
                  className={`btn button-group label-radio-custom ${
                    disabled ? 'buttonGroup-disabled' : ''
                  }`}
                  htmlFor={`${option.value}-${idRandom}`}
                >
                  {option.label}
                </label>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {icon}

      {error && (
        <span role="alert" className="alert-error position-relative">
          {error}
        </span>
      )}
    </div>
  );
};

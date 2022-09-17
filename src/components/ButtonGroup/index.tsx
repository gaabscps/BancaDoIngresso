import React, { FC } from 'react';

interface RadioProps {
  name: string;
  label?: any;
  error?: any;
  wrapperClass?: string;
  className?: string;
  icon?: any;
  options?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
}) => (
  <div className={`flex-column mb-4 ${wrapperClass}`}>
    {label && (
      <div className="d-flex flex-column-reverse">
        <label htmlFor={name} className="input-label m-0">
          {label}
        </label>
      </div>
    )}
    <br />
    <div>
      <div className="btn-group" role="group">
        {options.map((option: OptionProps) => {
          const idRandom = Math.random().toString(36).substr(2, 9);
          return (
            <React.Fragment key={option.value}>
              <input
                type="radio"
                className="btn-check radio-button-gruop"
                value={option.value}
                onChange={onChange}
                name={name}
                id={`${option.value}-${idRandom}`}
              />
              <label
                className="btn button-group label-radio-custom"
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

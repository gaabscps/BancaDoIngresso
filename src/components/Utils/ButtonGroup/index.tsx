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
}

interface OptionProps {
  value: string;
  label: string;
}

const ButtonGroup: FC<RadioProps> = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  icon,
  options,
}) => (
  <div className={`flex-column ${wrapperClass}`}>
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
    <div>
      <div className="btn-group mb-4" role="group">
        {options.map((option: OptionProps) => {
          const idRandom = Math.random().toString(36).substr(2, 9);
          return (
            <>
              <input
                {...register(name)}
                type="radio"
                className="btn-check radio-button-gruop"
                value={option.value}
                // name={option.value}
                id={`${option.value}-${idRandom}`}
                // checked={!!option.value}
              />
              <label
                className="btn button-group label-radio-custom"
                htmlFor={`${option.value}-${idRandom}`}
              >
                {option.label}
              </label>
            </>
          );
        })}
      </div>
    </div>
    {icon}
  </div>
);

export default ButtonGroup;

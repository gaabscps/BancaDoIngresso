import React from 'react';

interface InputFileProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  register?: any;
  error?: any;
  label?: string;
  wrapperClass?: string;
  accept?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
// export default InputFile;

const InputFile: React.FC<InputFileProps> = ({
  fileName,
  register,
  name,
  error,
  label,
  wrapperClass,
  accept,
  ...rest
}: InputFileProps) => (
  <div className={`mb-4 flex-column ${wrapperClass}`}>
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        background: '#f1f1f1',
        borderRadius: '5px',
        height: '62px',
      }}
    >
      <label
        htmlFor={name}
        className="input-label button-label-file"
        style={{
          padding: '10px 10px',
          width: '170px',
          backgroundColor: 'rgba(196, 196, 196, 1)',
          color: 'rgba(34, 34, 34, 1)',
          textAlign: 'center',
          margin: 'auto 0',
          borderRadius: '5px',
          display: 'block',
          cursor: 'pointer',
        }}
      >
        Escolher arquivo
      </label>
      <input
        {...rest}
        {...register(name)}
        type="file"
        accept={accept}
        name={name}
        id={name}
        style={{ display: 'none' }}
        className={`${error ? 'input-error' : ''}`}
      />
      <p
        style={{
          margin: '0 20px',
          color: '#A5A5A5',
          fontSize: '16px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {fileName ?? 'Nenhum arquivo selecionado'}
      </p>
    </div>
    {error && (
      <span role="alert" className="alert-error">
        {error}
      </span>
    )}
  </div>
);

export default InputFile;

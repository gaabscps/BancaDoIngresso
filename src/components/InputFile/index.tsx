import React from 'react';

interface InputFileProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  error?: any;
  label?: string;
  wrapperClass?: string;
  accept?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
// export default InputFile;

export const InputFile: React.FC<InputFileProps> = ({
  fileName,
  name,
  error,
  label,
  wrapperClass,
  accept,
  onChange,
}: InputFileProps) => (
  <div className={`flex-column input-component ${wrapperClass}`}>
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 10px',
        background: '#E6E6E6',
        borderRadius: '5px',
        height: '62px',
      }}
    >
      <label
        htmlFor={name}
        className="input-label button-label-file"
        style={{
          fontSize: '12px',
          padding: '15px',
          width: '145px',
          backgroundColor: '#C4C4C4',
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
        type="file"
        accept={accept}
        name={name}
        id={name}
        onChange={onChange}
        style={{ display: 'none' }}
        className={`${error ? 'input-error' : ''}`}
      />
      <p
        style={{
          margin: '0 20px',
          color: fileName ? '#222222' : '#A5A5A5',
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

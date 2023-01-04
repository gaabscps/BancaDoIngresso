import React from 'react';

interface InputFileProps {
  name: string;
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  label?: string | React.ReactNode;
  wrapperClass?: string;
  accept?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  refInput?: React.Ref<HTMLInputElement>;
}
// export default InputFile;

export const SimpleInputFile: React.FC<InputFileProps> = ({
  fileName,
  name,
  error,
  label,
  wrapperClass,
  accept,
  onChange,
  refInput,
  title,
}: InputFileProps) => (
  <div className={`flex-column input-component ${wrapperClass} ${error ? 'input-error' : ''}`}>
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        borderRadius: '5px',
        height: '62px',
        border: error ? '1px solid #D8413A' : 'none',
      }}
    >
      <label
        htmlFor={name}
        className="button-label-file"
        style={{
          fontSize: '16px',
          width: 'fit-content',
          backgroundColor: 'transparent',
          color: '#A5A5A5',
          textAlign: 'center',
          margin: 'auto 0',
          borderRadius: '5px',
          display: 'block',
          cursor: 'pointer',
          fontStyle: 'normal',
          fontWeight: '400',
        }}
      >
        inserir imagem do {title}
      </label>
      <input
        type="file"
        accept={accept}
        name={name}
        id={name}
        onChange={onChange}
        style={{ display: 'none' }}
        className={`${error ? 'input-error' : ''}`}
        ref={refInput}
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
        {fileName ?? ''}
      </p>
    </div>
    {error && (
      <span role="alert" className="alert-error">
        {error}
      </span>
    )}
  </div>
);

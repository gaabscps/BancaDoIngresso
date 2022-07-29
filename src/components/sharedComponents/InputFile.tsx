import React from 'react';

interface InputFileProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const InputFile: React.FC<InputFileProps> = (props: InputFileProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      background: '#E6E6E6',
      borderRadius: '5px',
      height: '62px',
      // width: '546px',
    }}
  >
    <label
      htmlFor={props.name}
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
      Escolher Arquivo
      <input
        type="file"
        name={props.name}
        id={props.name}
        onChange={e => props.onChange(e)}
        style={{ display: 'none' }}
      />
    </label>
    <p style={{ margin: '0 20px', color: '#A5A5A5', fontSize: '16px' }}>
      {props.fileName ?? 'Nenhum arquivo selecionado'}
    </p>
  </div>
);

export default InputFile;

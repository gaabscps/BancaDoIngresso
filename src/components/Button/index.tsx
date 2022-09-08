import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

interface ButtonCustomProps extends ButtonProps {
  title: string;
  disabled?: boolean;
  theme?: 'dark' | 'outlineDark' | 'noneBorder' | 'red';
  size?: 'md' | 'lg';
  type?: 'submit' | 'reset' | 'button';
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonCustomProps> = ({
  title,
  disabled,
  theme = 'dark',
  size = 'md',
  type = 'submit',
  className,
  style,
  onClick,
}) => {
  const finalTheme = {
    dark: 'btn-dark',
    outlineDark: 'btn-outline-dark',
    noneBorder: 'btn-none-border',
    red: 'btn-red',
  }[theme];

  const finalSize = {
    md: 'btn-md',
    lg: 'btn-lg',
  }[size];

  return (
    <button
      className={`btn ${finalTheme} ${finalSize} ${className}`}
      disabled={disabled}
      style={style}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

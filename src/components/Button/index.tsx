import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

export type ButtonTheme = 'dark' | 'outlineDark' | 'noneBorder' | 'red';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonCustomProps extends ButtonProps {
  title: string;
  disabled?: boolean;
  theme?: ButtonTheme;
  size?: ButtonSize;
  type?: ButtonType;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonCustomProps> = ({
  title,
  disabled,
  theme = 'dark',
  size = 'md',
  type = 'button',
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
    sm: 'btn-sm',
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

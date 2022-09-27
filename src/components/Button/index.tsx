import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

export type ButtonTheme = 'dark' | 'outlineDark' | 'noneBorder' | 'red';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

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
    dark: 'button-dark',
    outlineDark: 'button-outline-dark',
    noneBorder: 'button-none-border',
    red: 'button-red',
  }[theme];

  const finalSize = {
    sm: 'button-sm',
    md: 'button-md',
    lg: 'button-lg',
    xl: 'button-xl',
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

import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

type themeProps = 'dark' | 'outlineDark' | 'noneBorder' | 'red';
type sizeProps = 'md' | 'lg';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  theme?: themeProps;
  size?: sizeProps;
}

const Button: React.FC<ButtonCustomProps> = (props: ButtonCustomProps) => {
  const schemeTheme = {
    dark: 'btn-dark',
    outlineDark: 'btn-outline-dark',
    noneBorder: 'btn-none-border',
    red: 'btn-red',
  };

  const schemeSize = {
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return (
    <button
      {...props}
      className={`btn ${schemeTheme[props.theme as themeProps] ?? schemeTheme.dark} ${
        schemeSize[props.size as sizeProps] ?? schemeSize.md
      }`}
      style={{
        ...props.style,
      }}
    />
  );
};

export default Button;

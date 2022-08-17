import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

type themeProps = 'dark' | 'outlineDark' | 'noneBorder' | 'red';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  theme?: themeProps;
}

const Button: React.FC<ButtonCustomProps> = (props: ButtonCustomProps) => {
  const schemeTheme = {
    dark: 'btn-dark',
    outlineDark: 'btn-outline-dark',
    noneBorder: 'btn-none-border',
    red: 'btn-red',
  };

  return (
    <button
      {...props}
      className={`btn ${schemeTheme[props.theme as themeProps] ?? schemeTheme.dark}`}
      style={{
        fontWeight: '500',
        lineHeight: '24px',
        borderRadius: '5px',
        padding: '13px 15px',
        ...props.style,
      }}
    />
  );
};

export default Button;

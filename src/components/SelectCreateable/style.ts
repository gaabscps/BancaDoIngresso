/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent as ArrowDown } from '@/assets/images/svg/ArrowDown.svg';
import { SelectAutoCompleteProps } from '.';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const customStyles = (props: SelectAutoCompleteProps) => {
  const { error } = props;
  const isError = error && error !== '';

  const borderCustom = {
    default: 'none',
    error: '1px solid #D8413A',
  }[isError ? 'error' : 'default'];

  return {
    control: (provided: any, state: any) => ({
      ...provided,
      height: '62px',
      borderRadius: '5px',
      backgroundColor: '#E6E6E6',
      border: state.isFocused ? '1px solid #000' : borderCustom,
      boxShadow: state.isFocused && 'none',
      '&:hover': {
        backgroundColor: '#D9D9D9',
      },
    }),

    input: (provided: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '30px',
      margin: 'auto 0',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#A5A5A5',
      content: `url(${ArrowDown})`,
      marginRight: '15px',
      transform: 'scale(1.5)',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '2.625rem',
      padding: '1px 12px',
    }),
  };
};

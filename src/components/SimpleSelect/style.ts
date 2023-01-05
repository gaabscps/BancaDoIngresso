/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const customStyles = () => ({
  control: (provided: any, state: any) => ({
    ...provided,
    // width: '546px',
    width: '100%',
    borderRadius: '5px',
    backgroundColor: state.isFocused ? 'rgba(12, 2, 1, 0.2)' : 'transparent',
    border: '2px solid #222222;',
    boxShadow: state.isFocused && 'none',
    padding: '2px 0',
    '&:hover': {
      backgroundColor: 'rgba(12, 2, 1, 0.08)',
    },
    '&:active': {
      backgroundColor: 'rgba(12, 2, 1, 0.2)',
    },
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: '2.625rem',
    padding: '1px 12px',
    fontSize: '16px',
    fontWeight: '500;',
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
    color: '#000',
    padding: '0px 12px',
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    width: '200px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    boxShadow: state.isFocused && 'none',
    marginTop: '0px',
    zIndex: 999,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '3px',
      right: '-4px',
      transform: 'translateX(-50%)',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid rgba(12, 2, 1, 0.08)',
    },
    '&:hover:before': {
      borderBottom: '10px solid #E6E6E6',
    },
  }),

  menuList: (provided: any) => ({
    ...provided,
    padding: '0px',
    fontSize: '16px',
    fontWeight: '300;',
    lineHeight: '24px',
    right: '29px',
    width: '229px',
    border: '1px solid #E6E6E6',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: '10px',
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#E6E6E6' : 'transparent',
    color: '#000',
    fontSize: '16px',
    padding: '10px 12px',
    '&:hover': {
      backgroundColor: 'rgba(12, 2, 1, 0.08)',
    },
    '&:active': {
      backgroundColor: 'rgba(12, 2, 1, 0.2)',
    },
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: '#000',
    fontSize: '16px',
  }),
});

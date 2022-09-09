/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const customStyles = () => ({
  control: (provided: any, state: any) => ({
    ...provided,
    // width: '546px',
    height: '62px',
    borderRadius: '5px',
    backgroundColor: '#E6E6E6',
    border: state.isFocused ? '1px solid #000' : 'none', // TODO: refactor this
    boxShadow: state.isFocused && 'none',

    '&:hover': {
      backgroundColor: '#D9D9D9',
    },
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: '2.625rem',
    padding: '1px 12px',
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
});

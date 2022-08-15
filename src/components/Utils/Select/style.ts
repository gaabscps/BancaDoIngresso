export const customStyles = (props: any) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    // width: '546px',
    height: '62px',
    borderRadius: '5px',
    backgroundColor: state.isFocused ? '#e6e6e6' : '#f1f1f1',
    border: state.isFocused ? '1px solid #000' : 'none', // TODO: refactor this
    boxShadow: state.isFocused && 'none',

    '&:hover': {
      backgroundColor: '#e6e6e6',
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

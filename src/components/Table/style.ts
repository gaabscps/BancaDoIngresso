import { TableStyles } from 'react-data-table-component';
import { colors } from '@/styles/colors';

export const primaryTheme: TableStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWidth: '400',
      fontWeight: '400',
    },
  },
  rows: {
    style: {
      minWidth: '960px !important',
      minHeight: '5.188rem !important',
      border: 'none !important',
      borderRadius: '10px',
      backgroundColor: '#FFF',
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.02)',
      marginBottom: '30px',
      fontSize: '0.75rem',
      fontWidth: '300',
      fontWeight: '300',
    },
  },
  headCells: {
    style: {
      paddingLeft: '20px',
      paddingRight: '10px',
    },
  },
  cells: {
    style: {
      paddingLeft: '20px',
      paddingRight: '10px',
    },
  },
};

export const primaryThemeWithMargin: TableStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWidth: '400',
      fontWeight: '400',
    },
  },
  rows: {
    style: {
      minWidth: '960px !important',
      minHeight: '5.188rem !important',
      border: 'none !important',
      borderRadius: '10px',
      backgroundColor: '#FFF',
      marginBottom: '30px',
      fontSize: '0.75rem',
      fontWidth: '300',
      fontWeight: '300',
    },
  },
  headCells: {
    style: {
      paddingLeft: '20px',
      marginRight: '50px',
    },
  },
  cells: {
    style: {
      paddingLeft: '20px',
      marginRight: '50px',
    },
  },
};

export const secondaryTheme: TableStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWeight: '400',
      color: colors.a5grey,
    },
  },
  rows: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWeight: '400',
      overflow: 'hidden',
    },
  },
};

export const secondaryThemeVoucher = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWidth: '400',
      fontWeight: '400',
      color: '#A5A5A5',
    },
  },
  rows: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWidth: '400',
      overflow: 'hidden',
    },
  },
};

export const tertiaryTheme = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWidth: '400',
      color: '#A5A5A5',
    },
  },
  rows: {
    style: {
      borderBottom: '1.5px solid #E6E6E6',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWidth: '400',
      overflow: 'hidden',
      // minWidth: '960px !important',
      minHeight: '5.188rem !important',
    },
  },
};

export const secondaryWhithoutBorderTheme: TableStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      overflow: 'auto',
      border: '0px solid',
      margin: '0 -16px',
    },
  },
  head: {
    style: {
      border: '0px solid !important',
    },
  },
  headRow: {
    style: {
      border: '0px solid !important',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWidth: '400',
      color: '#A5A5A5',
      minHeight: '27px',
    },
  },
  rows: {
    style: {
      border: 'none !important',
      borderBottomWidth: '0px',
      backgroundColor: 'transparent',
      fontSize: '0.75rem',
      fontWidth: '400',
      overflow: 'hidden',
      minHeight: '37px',
    },
  },
};

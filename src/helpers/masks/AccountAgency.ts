/* eslint-disable no-useless-escape */
// unmasked (api view): 00000
// masked (user view): 0000-0
const formatAgenciaConta = (value: string): string => {
  if (value) {
    return value.replace(/\D/g, '').replace(/(\d)(\d{1})$/, '$1-$2');
  }
  return value;
}

const isValid = (value: string): boolean => {
  const regex = /(\d)(\d{1})$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = formatAgenciaConta;

export { isValid, unmask, updateMask };

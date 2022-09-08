// unmasked (api view): 04279080
// masked (user view): 04279-080

const isValid = (cep: string): boolean => {
  const regex = /^(\d{5}-\d{3})$/;
  return regex.test(cep);
};

const format = (value: string): string | null => {
  const regex = /^(\d{8})$/;
  if (!regex.test(value)) {
    return null;
  }
  return value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = (value: string): string =>
  value.replace(/\D/g, '').replace(/^(\d{0,5})?(\d{0,3})?$/, (match, p1, p2) => {
    if (p2) {
      return `${p1}-${p2}`;
    }
    if (p1) {
      return `${p1}`;
    }
    return '';
  });

export { isValid, format, unmask, updateMask };

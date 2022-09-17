// unmasked (api view): 23/12
// masked (user view): 23/12

const isValid = (date: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})$/;
  return regex.test(date);
};

const format = (value: string): string | null => {
  if (!isValid(value)) {
    return null;
  }
  return value;
};

const unmask = (value: string): string => value;

const updateMask = (value: string): string =>
  value.replace(/\D/g, '').replace(/^(\d{0,2})?(\d{0,2})?$/, (match, p1, p2) => {
    if (p2) {
      return `${p1}/${p2}`;
    }
    if (p1) {
      return `${p1}`;
    }
    return '';
  });

export { isValid, format, unmask, updateMask };

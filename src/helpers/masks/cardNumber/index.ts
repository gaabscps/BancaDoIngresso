// unmasked (api view): 1234 5678 9012 3456
// masked (user view): 1234 5678 9012 3456

const isValid = (value: string): boolean => {
  const regex = /^(\d{4}) (\d{4}) (\d{4}) (\d{4})$/;
  return regex.test(value);
};

const format = (value: string): string | null => {
  if (!isValid(value)) {
    return null;
  }
  return value;
};

const unmask = (value: string): string => value;

const updateMask = (value: string): string =>
  value
    .replace(/\D/g, '')
    .replace(
      /^(\d{0,4})?(\d{0,4})?(\d{0,4})?(\d{0,4})?(\d{0,3})?$/,
      (match, p1, p2, p3, p4, p5) => {
        if (p5) {
          return `${p1} ${p2} ${p3} ${p4} ${p5}`;
        }
        if (p4) {
          return `${p1} ${p2} ${p3} ${p4}`;
        }
        if (p3) {
          return `${p1} ${p2} ${p3}`;
        }
        if (p2) {
          return `${p1} ${p2}`;
        }
        if (p1) {
          return `${p1}`;
        }
        return '';
      },
    );

export { isValid, format, unmask, updateMask };

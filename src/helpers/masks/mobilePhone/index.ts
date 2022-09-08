const isValid = (date: string): boolean => {
  const regex = /\((\d{2})\)\s(\d{5})-(\d{4})/;
  return regex.test(date);
};

const format = (value: string): string | null => {
  if (!isValid(value)) {
    return null;
  }
  return value;
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = (value: string): string =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{1,2})/, '($1')
    .replace(/(\d{2})(\d{1,5})/, '$1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');

export { isValid, format, unmask, updateMask };

const validLength = (value: string, maxLength: number): boolean => value.length <= maxLength;

const hasMoreThen3Letters = (value: string): boolean =>
  /[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(value);

const isRG = (value: string): boolean => validLength(value, 13) && !hasMoreThen3Letters(value);

const unmask = (value: string): string => value.replace(/[^a-zA-Z0-9]/g, '');

const isValid = (rg: string): boolean => {
  const unmaskedRg = unmask(rg);
  return isRG(unmaskedRg);
};

export { isValid, unmask };

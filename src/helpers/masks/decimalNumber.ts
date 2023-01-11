/* eslint-disable no-useless-escape */
// unmasked (api view): 7654321
// masked (user view): 7.654.321,00
import { toString } from '../common/amount';

const isValid = (value: string): boolean => {
  const regex = /^-?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;
  return regex.test(value);
};

const unmask = (value: string): string => value?.replace(/\./g, '').replace(/\,/g, '.');

const updateMask = (value: string): string => {
  const unmasked = unmask(value);
  const masked = toString(unmasked);
  return masked;
};

export { isValid, unmask, updateMask };

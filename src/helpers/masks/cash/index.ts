// unmasked (api view): 7654321
// masked (user view): 7.654.321,00
import { toString } from '../../common/amount';

const isValid = (value: string): boolean => {
  const regex = /^((\d{1,3}\.){0,1}(\d{3}\.)*(\d{3})|(\d{1,3}))\,(\d{2})$/;
  return regex.test(value);
};

const unmask = (value: string): string => value.replace(/\.|\R|\$|\ /g, '').replace(/\,/g, '.');

const updateMask = (value: string): string => {
  if (Number.isNaN(parseInt(unmask(value), 10))) {
    return toString(0, { withSign: true });
  }
  return toString(unmask(value).replace(/\./g, ''), { withSign: true });
};

export { isValid, unmask, updateMask };

/* eslint-disable no-useless-escape */
// unmasked (api view): 60201495000149
// masked (user view): 60.201.495/0001-49
import { isCNPJ, formatToCNPJ } from 'brazilian-values';

const isValid = (value: string): boolean => {
  const regex = /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})\-(\d{2})$/;
  if (!regex.test(value)) {
    return false;
  }

  return isCNPJ(value);
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = formatToCNPJ;

export { isValid, unmask, updateMask };

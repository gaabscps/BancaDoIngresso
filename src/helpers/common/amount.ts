import Decimal from 'decimal.js';

import currencyFormatter from './mask';

const toFloat = (amount: number): string => new Decimal(amount).dividedBy(100).toFixed(2);

const toInteger = (amountInReals: string): number =>
  new Decimal(amountInReals).times(100).toNumber();

const toCents = (amountInReals: number): number => new Decimal(amountInReals).times(100).toNumber();

const toPercentage = (amount: number): string => {
  const option = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const { format } = new Intl.NumberFormat('pt-BR', option);

  return format(amount);
};

const toString = (amountInCents: number | string, { withSign } = { withSign: false }): string => {
  let result = '';
  if (withSign) {
    result = currencyFormatter(String(amountInCents)).masked;
  } else {
    result = currencyFormatter(String(amountInCents)).maskedWithoutUnit;
  }

  return result;
};

export { toFloat, toInteger, toCents, toString, toPercentage };

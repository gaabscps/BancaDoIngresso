import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

interface IFormatValueToCurrency {
  masked: string;
  maskedWithoutUnit: string;
}

const removeSpecialCharacters = (value: string): string => String(value).replace(/\D/g, '');

const formatValueToCurrency = (value: string): IFormatValueToCurrency => {
  const prefix = Number(value) < 0 ? '-' : '';

  const valueNumeric = value ? Number(removeSpecialCharacters(value)) : 0;

  const valueNumericInCents = valueNumeric / 100;

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const finalCurrencyValue = formatter.format(valueNumericInCents);

  return {
    masked: `R$ ${prefix}${finalCurrencyValue}`,
    maskedWithoutUnit: `${prefix}${finalCurrencyValue}`,
  };
};

export default formatValueToCurrency;

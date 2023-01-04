import dayjs from 'dayjs';

const isValid = (date: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return regex.test(date);
};

const format = (value: string): string | null => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!regex.test(value)) {
    return null;
  }
  return value.replace(/^(\d{4})-(\d{2})-(\d{2})$/, (match, p1, p2, p3) => `${p3}/${p2}/${p1}`);
};

const unmask = (value: string): string | null => {
  if (!isValid(value)) {
    return null;
  }
  return value.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, (match, p1, p2, p3) => `${p3}-${p2}-${p1}`);
};

const updateMask = (value: string): string =>
  value.replace(/\D/g, '').replace(/^(\d{0,2})?(\d{0,2})?(\d{0,4})?$/, (match, p1, p2, p3) => {
    if (p3) {
      return `${p1}/${p2}/${p3}`;
    }
    if (p2) {
      return `${p1}/${p2}`;
    }
    if (p1) {
      return `${p1}`;
    }
    return '';
  });

const dateToString = (date: Date): string => {
  let s = '';
  if (date) {
    s = dayjs(date).locale('pt-br').format('DD/MM/YYYY');
  }
  return s;
};

export { isValid, format, unmask, updateMask, dateToString };

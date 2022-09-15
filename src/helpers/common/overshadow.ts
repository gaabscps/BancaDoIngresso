const unmask = (value: string): string => value.replace(/[^a-zA-Z0-9]/g, '');

const overshadowCPF = (value: string): string => {
  if (!value) return '';
  if (value.includes('•••')) return value;

  const unmaskedValue = unmask(value);
  return unmaskedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '•••.$2.$3-••');
};

const overshadowMobilePhone = (value: string): string => {
  if (!value) return '';
  if (value.includes('•••')) return value;

  const unmaskedValue = unmask(value);
  return unmaskedValue
    .replace(/\D/g, '')
    .replace(/(\d{1,2})/, '($1')
    .replace(/(\d{2})(\d{1,5})/, '$1) ••••• ');
};

export { overshadowCPF, overshadowMobilePhone };

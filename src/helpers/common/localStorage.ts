/* eslint-disable @typescript-eslint/no-explicit-any */
const setItem = (key: string, value: any): void => localStorage.setItem(key, JSON.stringify(value));

const getItem = (key: string): any => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }

  return {};
};

const getRawValue = (key: string): string | null => localStorage.getItem(key);

const getBoolean = (key: string): boolean => {
  const value = localStorage.getItem(key);
  return !!value;
};

const removeItem = (key: string): void => localStorage.removeItem(key);

export { setItem, getItem, getRawValue, getBoolean, removeItem };

/* eslint-disable @typescript-eslint/no-explicit-any */
const setItem = (key: string, value: any): void =>
  sessionStorage.setItem(key, JSON.stringify(value));

const getItem = (key: string): any => {
  const value = sessionStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }

  return {};
};

const getRawValue = (key: string): string | null => sessionStorage.getItem(key);

const getBoolean = (key: string): boolean => {
  const value = sessionStorage.getItem(key);
  return !!value;
};

const removeItem = (key: string): void => sessionStorage.removeItem(key);

export { setItem, getItem, getRawValue, getBoolean, removeItem };

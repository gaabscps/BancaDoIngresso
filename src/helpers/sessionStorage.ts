import Auth from '../entities/Auth';

export const getSessionStorage = (key: string): string | null => sessionStorage.getItem(key);

export const addToSessionStorage = (key: string, value: any): void => {
  if (typeof value !== typeof '') {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const isAuthenticated = (): boolean =>
  Boolean(getSessionStorage(process.env.REACT_APP_USER as string));

export const setAuthSessionStorage = (auth: Auth): void => {
  const { token, user } = auth;
  if (token && user) {
    addToSessionStorage(process.env.REACT_APP_AUTH as string, token);
    addToSessionStorage(process.env.REACT_APP_USER as string, JSON.stringify(user));
  }
};

export const removeAuthSessionStorage = (): void => {
  sessionStorage.removeItem(process.env.REACT_APP_AUTH as string);
  sessionStorage.removeItem(process.env.REACT_APP_USER as string);
};

export const removeSessionStorage = (key: string): void => sessionStorage.removeItem(key);

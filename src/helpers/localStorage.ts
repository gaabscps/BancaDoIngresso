export const getLocalStorage = (key: string): string | null => localStorage.getItem(key);

export const addToLocalStorage = (key: string, value: any): void => {
  if (typeof value !== typeof '') {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } else {
    localStorage.setItem(key, value);
  }
};

export const isAuthenticated = (): boolean =>
  Boolean(getLocalStorage(process.env.REACT_APP_USER as string));

interface UserAuthResponse {
  id: string;
  name: string;
  imageUrl: string;
  profile: string;
  roles: string[];
}

export interface AuthResponse {
  user: UserAuthResponse;
  token: string;
  refresh_token: string;
}

export const setAuthLocalStorage = (auth: AuthResponse): void => {
  const { token, user } = auth;
  if (token && user) {
    addToLocalStorage(process.env.REACT_APP_AUTH as string, token);
    addToLocalStorage(process.env.REACT_APP_USER as string, JSON.stringify(user));
  }
};

export const removeAuthLocalStorage = (): void => {
  localStorage.removeItem(process.env.REACT_APP_AUTH as string);
  localStorage.removeItem(process.env.REACT_APP_USER as string);
};

export const removeLocalStorage = (key: string): void => localStorage.removeItem(key);

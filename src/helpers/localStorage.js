export const getLocalStorage = (key) => localStorage.getItem(key);

export const addToLocalStorage = (key, value) => {
  if (typeof value !== typeof "") {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } else {
    localStorage.setItem(key, value);
  }
};

export const isAuthenticated = () =>
  Boolean(getLocalStorage(process.env.REACT_APP_USER));

export const setAuthLocalStorage = ({ token, user }) => {
  if (token && user) {
    addToLocalStorage(process.env.REACT_APP_AUTH, token);
    addToLocalStorage(process.env.REACT_APP_USER, JSON.stringify(user));
  }
};

export const removeAuthLocalStorage = () => {
  localStorage.removeItem(process.env.REACT_APP_AUTH);
  localStorage.removeItem(process.env.REACT_APP_USER);
};

export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const getSessionStorage = (key) => sessionStorage.getItem(key);

export const addToSessionStorage = (key, value) => {
  if (typeof value !== typeof "") {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const isAuthenticated = () =>
  Boolean(getSessionStorage(process.env.REACT_APP_USER));

export const setAuthSessionStorage = ({ token, user }) => {
  if (token && user) {
    addToSessionStorage( "token", token);
    addToSessionStorage("user", JSON.stringify(user));
  }
};

export const removeAuthSessionStorage = () => {
  sessionStorage.removeItem(process.env.REACT_APP_AUTH);
  sessionStorage.removeItem(process.env.REACT_APP_USER);
};

export const removeSessionStorage = (key) => sessionStorage.removeItem(key);

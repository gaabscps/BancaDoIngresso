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
  Boolean(getLocalStorage("user"));

export const setAuthLocalStorage = ({ token, user }) => {
  if (token && user) {
    addToLocalStorage( "token", token);
    addToLocalStorage("user", JSON.stringify(user));
  }
};

export const removeAuthLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const removeLocalStorage = (key) => localStorage.removeItem(key);

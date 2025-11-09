// Set to local storage
const setStorage = (key: string, value: object) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
};

// Get from local storage
const getStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

// Remove from local storage
const removeStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

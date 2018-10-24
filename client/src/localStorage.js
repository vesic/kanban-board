export const getFromLocalStorage = (key: string, fallback: any) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
};

export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearAllLocalStorage = keysToDelete => {
  for (const key of keysToDelete) {
    window.localStorage.removeItem(key);
  }
};

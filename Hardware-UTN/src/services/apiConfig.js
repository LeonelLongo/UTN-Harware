export const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const TOKEN_KEY = "hardware-utn-token";

export const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

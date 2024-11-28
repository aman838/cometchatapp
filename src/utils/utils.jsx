export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

export const APP_ID = "263625ca74d287b0";
export const REGION = "in";
export const AUTH_KEY = "e20f22ea3ff159a09821b3bbb1cac0dd49aca7ac";

export const API_URL = "https://263625ca74d287b0.api-in.cometchat.io/v3";

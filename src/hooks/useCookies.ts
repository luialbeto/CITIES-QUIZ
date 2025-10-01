import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

interface UseCookiesReturn {
  getCookie: (name: string) => string | undefined;
  setCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => void;
  removeCookie: (name: string) => void;
}

export const useCookies = (): UseCookiesReturn => {
  const [, setUpdate] = useState(0);

  const getCookie = useCallback((name: string): string | undefined => {
    return Cookies.get(name);
  }, []);

  const setCookie = useCallback(
    (name: string, value: string, options?: Cookies.CookieAttributes): void => {
      Cookies.set(name, value, options);
      setUpdate((prev) => prev + 1);
    },
    []
  );

  const removeCookie = useCallback((name: string): void => {
    Cookies.remove(name);
    setUpdate((prev) => prev + 1);
  }, []);

  return { getCookie, setCookie, removeCookie };
};
import { destroyCookie, setCookie, parseCookies } from "nookies";

interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
}

export const setCookies = (
  key: string,
  value: string,
  options: CookieOptions = { path: "/", maxAge: 30 * 24 * 60 * 60 } // Default options defined here
) => {
  setCookie(null, key, value, options); // This looks correct
  console.log("🚀 ~ setCookies ~ value:", value)
};

export const removeCookies = (
  key: string,
  options: CookieOptions = { path: "/" }
) => {
  destroyCookie(null, key, options);
};

export const getCookies = (key: string) => {
  const cookies = parseCookies();
  return cookies[key];
};

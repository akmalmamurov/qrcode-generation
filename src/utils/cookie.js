import {
  defaultTo,
  filter,
  prop,
  head,
  last,
  map,
  pipe,
  split,
  startsWith,
  trim,
} from "ramda";

export const setCookie = (name, value, expire) => {
  const date = new Date();
  date.setTime(date.getTime() + expire * 1000);
  const expires = "expires=" + date.toUTCString();
  if (typeof document !== "undefined") {
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
};

export const getCookie = (key) =>
  pipe(
    split(";"),
    map(trim),
    filter(startsWith(key)),
    defaultTo([]),
    map(split("=")),
    filter(prop(1)),
    head,
    defaultTo([]),
    last,
  )(document.cookie);

export const getCookieExpirationTime = (key) => {
  const cookie = getCookie(key);
  if (!cookie) return null;

  const cookieParts = cookie.split(";");
  const expiresPart = cookieParts.find((part) =>
    part.trim().startsWith("expires="),
  );
  if (!expiresPart) return null;

  const expiresDate = new Date(expiresPart.trim().split("=")[1]);
  return expiresDate.getTime();
};

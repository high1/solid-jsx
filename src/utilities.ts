import { isServer } from 'solid-js/web';

export const isFirstLetterCapital = (string: string): boolean =>
  string[0] !== string[0].toLowerCase();

export const capitalizeFirstLetter = (
  [first, ...rest]: string,
  locale = !isServer && navigator.language
): string => [first.toLocaleUpperCase(locale), ...rest].join('');

const attributeCamelCasedRegExp =
  /e(r[HRWrv]|[Vawy])|Con|l(e[Tcs]|c)|s(eP|y)|a(t[rt]|u|v)|Of|Ex|f[XYa]|gt|hR|d[Pg]|t[TXYd]|[UZq]/; //URL: https://regex101.com/r/I8Wm4S/1
const attributesCache = Object.create(null) as Record<string, string>;
const uppercaseRe = /[A-Z]/g;

export const normalizeKeySvg = (key: string): string =>
  attributesCache[key] ||
  (attributesCache[key] = attributeCamelCasedRegExp.test(key)
    ? key
    : key.replace(uppercaseRe, (char) => `-${char.toLowerCase()}`));

const svgRe =
  /^(t(ext$|s)|s[vwy]|g)|^set|tad|ker|p(at|s)|s(to|c$|ca|k)|r(ec|cl)|ew|us|f($|e|s)|cu|n[ei]|l[ty]|[GOP]/; //URL: https://regex101.com/r/Ck4kFp/1
const svgCache: Record<string, boolean> = {};

export const isSVGElement = (element: string): boolean =>
  element in svgCache
    ? svgCache[element]
    : (svgCache[element] = svgRe.test(element) && !element.includes('-'));

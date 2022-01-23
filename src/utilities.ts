export const isFirstLetterCapital = (string: string): boolean =>
  string[0] !== string[0].toLowerCase();

export const capitalizeFirstLetter = (
  [first, ...rest]: string,
  locale = navigator.language
): string => [first.toLocaleUpperCase(locale), ...rest].join('');

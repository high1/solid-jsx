import { createComponent, createContext, JSX, mergeProps, ParentProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { isFirstLetterCapital, isSVGElement, normalizeKeySvg } from 'utilities';

export const MDXContext = createContext({});

export const MDXProvider = (
  properties: ParentProps<{
    components: Record<string, (properties_: ParentProps) => JSX.Element>;
  }>,
): JSX.Element =>
  createComponent(MDXContext.Provider, {
    value: {
      ...useContext(MDXContext),
      ...properties.components,
    },
    children: properties.children,
  });

export const useMDXComponents = (): Record<string, (properties: ParentProps) => JSX.Element> =>
  useContext(MDXContext);

const REPLACED_COMPAT_SET = new Set(['mjx']);
const compatRegExp = new RegExp(`(?:${[...REPLACED_COMPAT_SET].join('|')})-.+`, 'g');

const expressionCache = Object.create(null) as Record<string, string>;
const replaceDashWithUnderscore = <T>(expression: T): string | T =>
  typeof expression === 'string'
    ? expressionCache[expression] ??
      (expressionCache[expression] = expression.replaceAll(compatRegExp, (match: string) =>
        match.replaceAll('-', '_'),
      ))
    : expression;

const getProperties = (
  properties: Record<string, unknown> & { children?: JSX.Element },
  type?: string,
): ParentProps => {
  const properties_: Record<string, unknown> = {};
  for (const key of Object.keys(properties))
    properties_[jsxKeyToSolid(key, type)] =
      typeof properties[key] === 'object' && !Array.isArray(properties[key])
        ? getProperties(properties[key] as Record<string, unknown>, type)
        : replaceDashWithUnderscore(properties[key]);
  return properties_;
};

export const Fragment = (properties: ParentProps): JSX.Element => properties.children;

export const jsx = (
  type: string | ((properties_: ParentProps) => JSX.Element),
  properties: ParentProps,
): JSX.Element =>
  typeof type === 'function'
    ? type.name === 'Fragment'
      ? Fragment(properties)
      : type(getProperties(properties))
    : createComponent(
        Dynamic,
        mergeProps(isFirstLetterCapital(type) ? properties : getProperties(properties, type), {
          component: replaceDashWithUnderscore(type),
        }),
      );

const jsxKeyToSolid = (key: string, type = ''): string =>
  isSVGElement(type)
    ? (key = key === 'xlinkHref' || key === 'xlink:href' ? 'href' : normalizeKeySvg(key))
    : key;

// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

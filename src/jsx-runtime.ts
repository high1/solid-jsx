import { createComponent, JSX, mergeProps, PropsWithChildren } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { LOWERCASE_ATTRIBUTES, REPLACED_COMPAT, ATTRIBUTES_PROPERTIES_MAP } from 'elements';
import { isFirstLetterCapital } from 'utilities';

const compatRegExp = new RegExp([...REPLACED_COMPAT.keys()].join('|'), 'g');

const svgXmlnsRegExp = /^(xmlns)([A-Z][a-z]+)/;

const webComponentRegExp = /^[a-z]+(?:-[a-z]+)+$/;

const getProperties = (
  properties: Record<string, unknown> & { children?: JSX.Element }
): PropsWithChildren => {
  const properties_: Record<string, unknown> = {};
  for (const key of Object.keys(properties))
    properties_[jsxKeyToSolid(key)] =
      typeof properties[key] === 'object' && !Array.isArray(properties[key])
        ? getProperties(properties[key] as Record<string, unknown>)
        : typeof properties[key] === 'string'
        ? (properties[key] as string).replace(
            compatRegExp,
            (match: string) => REPLACED_COMPAT.get(match) ?? match
          )
        : properties[key];
  return properties_;
};

export const Fragment = (properties: PropsWithChildren): JSX.Element => properties.children;

export const jsx = (
  type: string | ((properties_: PropsWithChildren) => JSX.Element),
  properties: PropsWithChildren
): JSX.Element =>
  typeof type === 'function'
    ? type.name === 'Fragment'
      ? Fragment(properties)
      : type(getProperties(properties))
    : createComponent(
        Dynamic,
        mergeProps(isFirstLetterCapital(type) ? properties : getProperties(properties), {
          component: webComponentRegExp.test(type) ? REPLACED_COMPAT.get(type) ?? type : type,
        })
      );

// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

const jsxKeyToSolid = (key: string): string =>
  ATTRIBUTES_PROPERTIES_MAP.get(key) ??
  LOWERCASE_ATTRIBUTES.get(key) ??
  key.replace(svgXmlnsRegExp, (_, p1: string, p2: string) => `${p1}:${p2.toLowerCase()}`);

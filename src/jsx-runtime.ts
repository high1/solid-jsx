import { createComponent, JSX, mergeProps, PropsWithChildren } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  CSS_PROPERTIES,
  LOWERCASE_ATTRIBUTES,
  MAPPED_ATTRIBUTES,
  REPLACED_COMPAT,
  SVG_ATTRIBUTES,
} from 'elements';

export const Fragment = (properties: PropsWithChildren): JSX.Element => properties.children;

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
            new RegExp([...REPLACED_COMPAT.keys()].join('|'), 'g'),
            (match: string) => REPLACED_COMPAT.get(match) ?? match
          )
        : properties[key];
  return properties_;
};

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
        mergeProps(getProperties(properties), { component: REPLACED_COMPAT.get(type) ?? type })
      );

// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

const jsxKeyToSolid = (key: string): string =>
  MAPPED_ATTRIBUTES.get(key) ??
  LOWERCASE_ATTRIBUTES.get(key) ??
  key
    .replace(
      /^(xml(?:ns)?|xlink)([A-Z][a-z]+)/,
      (_, p1: string, p2: string) => `${p1}:${p2.toLowerCase()}`
    )
    .replace(
      new RegExp(
        `^(${[...CSS_PROPERTIES, ...SVG_ATTRIBUTES].join(
          '|'
        )})([A-Z][a-z]+)([A-Z][a-z]+)?([A-Z][a-z]+)?`
      ),
      (_, p1: string, p2: string, p3?: string, p4?: string) =>
        [p1, p2, p3, p4]
          .filter(Boolean)
          .map((value) => value?.toLowerCase())
          .join('-')
    );

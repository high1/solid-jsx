import { createComponent, JSX, mergeProps, PropsWithChildren } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const Fragment = (properties: PropsWithChildren): JSX.Element => properties.children;

const getProperties = (
  properties: Record<string, unknown> & { children?: JSX.Element }
): PropsWithChildren => {
  const properties_: Record<string, unknown> = {};
  for (const key of Object.keys(properties))
    properties_[jsxKeyToSolid(key)] =
      typeof properties[key] === 'object' && !Array.isArray(properties[key])
        ? getProperties(properties[key] as Record<string, unknown>)
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
    : createComponent(Dynamic, mergeProps(getProperties(properties), { component: type }));

// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

// Attributes that need to be renamed
const MAPPED_ATTRIBUTES = new Map<string, string>([
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['glyphName', 'glyph-name'],
  ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
  ['glyphOrientationVertical', 'glyph-orientation-vertical'],
  // ['horizAdvX', 'horiz-adv-x'],
  // ['horizOriginX', 'horiz-origin-x'],
  ['markerEnd', 'marker-end'],
  ['markerMid', 'marker-mid'],
  ['markerStart', 'marker-start'],
  ['textAnchor', 'text-anchor'],
  ['textDecoration', 'text-decoration'],
  ['textRendering', 'text-rendering'],
]);

// Attributes that need to be converted to lowercase
const LOWERCASE_ATTRIBUTES = new Map<string, string>(
  [
    'autoComplete',
    'autoFocus',
    'allowFullScreen',
    'contentEditable',
    'formNoValidate',
    'isMap',
    'noModule',
    'noValidate',
    'playsInline',
    'readOnly',
    'tabIndex',
  ].map((attribute) => [attribute, attribute.toLowerCase()])
);

const jsxKeyToSolid = (key: string): string =>
  MAPPED_ATTRIBUTES.get(key) ??
  LOWERCASE_ATTRIBUTES.get(key) ??
  key
    .replace(
      /^(xmlns|xlink|xml)([A-Z][a-z]+)/,
      (_, p1: string, p2: string) => `${p1}:${p2.toLowerCase()}`
    )
    .replace(
      /^(accent|arabic|baseline|cap|clip|color|dominant|enable|fill|flood|font|image|letter|lightning|overline|paint|pointer|rendering|shape|stop|strikethrough|stroke|transform|underline|unicode|v|vector|vert|vertical|word|writing|x|)([A-Z][a-z]+?)([A-Z][a-z]+?)?/,
      (_, p1: string, p2: string, p3: string | undefined) =>
        `${p1}-${p2.toLowerCase()}${p3 ? `-${p3}` : ''}`
    );

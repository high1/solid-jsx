import {
  Component,
  createComponent,
  createMemo,
  JSX,
  mergeProps,
  PropsWithChildren,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const Fragment: Component = (properties: PropsWithChildren) =>
  createMemo(() => properties.children);

export const jsx = (
  type: string | ((properties_: PropsWithChildren) => Component),
  properties: Record<string, unknown> & { children: JSX.Element }
): Component => {
  const newProperties: Record<string, unknown> = {};

  for (const key of Object.keys(properties)) newProperties[jsxKeyToSolid(key)] = properties[key];

  return typeof type === 'function'
    ? type.name === 'Fragment'
      ? () => createComponent(Fragment, newProperties)
      : type(newProperties)
    : () => createComponent(Dynamic, mergeProps(newProperties, { component: type }));
};

// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

const MAPPED_ATTRIBUTES = new Map([
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['tabIndex', 'tabindex'],
  ['readOnly', 'readonly'],
  ['autoComplete', 'autocomplete'],
  ['autoFocus', 'autofocus'],
  ['contentEditable', 'contenteditable'],
  ['noValidate', 'novalidate'],
]);

const jsxKeyToSolid = (key: string): string =>
  MAPPED_ATTRIBUTES.get(key) ||
  key.replace(/^(xmlns|xlink)(.+)/, (_, p1: string, p2: string) => `${p1}:${p2.toLowerCase()}`);

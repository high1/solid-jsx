import { Component, PropsWithChildren } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const Fragment: Component = (properties: PropsWithChildren) => <>{properties.children}</>;

export function jsx(
  type: string | ((properties_: PropsWithChildren) => Component),
  properties: PropsWithChildren
): Component {
  return typeof type === 'function'
    ? type.name === 'Fragment'
      ? () => <Fragment>{properties.children}</Fragment>
      : type(properties)
    : () => <Dynamic component={type} {...properties} />;
}
// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx;

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx;

/* eslint-disable import/no-unresolved */
/**
 * An MDX file which exports a JSX component.
 */
declare module '*.mdx' {
  import { JSX, ParentProps } from 'solid-js';

  type MDXComponents = {
    [key in keyof JSX.IntrinsicElements | string]: key extends keyof JSX.IntrinsicElements
      ? ((properties: JSX.IntrinsicElements[key]) => JSX.Element) | keyof JSX.IntrinsicElements
      : (properties: ParentProps) => JSX.Element;
  };

  type CustomComponents = {
    [key: string]: (properties: ParentProps) => JSX.Element;
  };

  interface MDXProperties {
    components?: Partial<MDXComponents>;
    children?: JSX.Element;
    [key: string]: unknown;
  }

  /**
   * An function component which renders the MDX content using JSX.
   *
   * @param props This value is be available as the named variable `props` inside the MDX component.
   * @returns A JSX element. The meaning of this may depend on the project configuration. I.e. it
   * could be a React, Preact, or Vuex element.
   */
  export default function Component(properties: MDXProperties): JSX.Element;
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.md' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.markdown' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.mdown' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.mkdn' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.mkd' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.mdwn' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.mkdown' {
  export { default } from '*.mdx';
}

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.ron' {
  export { default } from '*.mdx';
}

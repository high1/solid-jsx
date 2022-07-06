# solid-jsx

## What?

Use [mdx](https://mdxjs.com/) or [xdm](http://wooorm.com/xdm/) with [solid-js](https://www.solidjs.com/).

This module is ESM only, due to [mdx](https://mdxjs.com/) and [xdm](http://wooorm.com/xdm/) being ESM only.

Adding

```json
"type": "module"
```

in package.json is one option.

## Installation

```sh
pnpm install --save-dev solid-jsx
```

## Usage

This library can be used alongside version 2 of [@mdx-js](https://mdxjs.com/), or [xdm](http://wooorm.com/xdm/) by setting the jsxImportSource property to **'solid-jsx'**.

You can use their official integration with various bundlers, and frameworks,
below is an [@mdx-js](https://mdxjs.com/) configuration sample for [Vite](https://vitejs.dev), which supports rollup plugins.

```js
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [mdx({ jsxImportSource: 'solid-jsx', remarkPlugins: [remarkGfm] }), solid()],
  build: {
    target: 'esnext',
  },
});
```

Draw math with [xdm](http://wooorm.com/xdm/) and [mathjax](https://www.mathjax.org/)

```js
import solid from 'vite-plugin-solid';
import xdm from 'xdm/rollup.js';
import remarkMath from 'remark-math';
import uno from 'unocss/vite';
import remarkMath from 'remark-math';
import rehypeMathJaxSVG from 'rehype-mathjax/svg.js';

export default defineConfig({
  plugins: [
    xdm({
      jsxImportSource: 'solid-jsx',
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJaxSVG],
    }),
    solid(),
    uno(),
  ],
});
```

More information -> [Integrations](https://mdxjs.com/docs/getting-started/#integrations).

All markdown tags and custom components replacement are supported.

However, since the code goes through the @mdx-js/xdm compiler and not through the solid-js compiler,
inline components will not be reactive.

```jsx
export const Counter = () => {
  const [count, setCount] = createSignal(0);
  return (
    <>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
      <p>{count}</p>
    </>
  )
}
<Counter />
```

This limitation is minor, since writing components inline is just one option,
and by far the worst one of them all, with limited syntax and language support.

You can always import directly TypeScript/JavaScript components inside .mdx

```mdx
import Counter from './Counter';

<Counter />
```

or pass the component to markdown directly

```mdx
Hello <Counter />
```

```jsx
import Message from './message.mdx';

<Message components={{ Counter }} />;
```

To have dynamic tags, use solid-js Dynamic component.

```jsx
const options: Record<string, Component> = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing,
};
<Message
  components={{
    h2: 'h6',
    h1: () => <div>Test</div>,
    Planet: () => <Dynamic component={options[selected()]} />,
  }}
/>;
```

When nesting MDX files, importing components at the top or repeating the same set of those as parameters can become cumbersome.  
You can use MDXProvider to avoid this:

```jsx
import { MDXProvider } from 'solid-jsx';

render(() => (
  <MDXProvider components={{ Tweet }}>
    <App />
  <MDXProvider>
  )
);
```

The package also provides Typescript support, the types can be referenced as "solid-jsx/types". In tsconfig.json:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "solid-jsx/types"]
  }
}
```

## Support

This project is free and open-source, so if you think this project can help you or
anyone else, you may [star it on GitHub](https://github.com/high1/solid-jsx). Feel
free to [open an issue](https://github.com/high1/solid-jsx/issues) if you have any
ideas, questions, or if you've found a bug.

## Contribute

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_ series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

We are following the [Conventional Commits](https://www.conventionalcommits.org) convention.

### Develop

- `pnpm build`: Generate bundles
- `pnpm lint`: Lints code

## License

`solid-jsx` is open source software [licensed as MIT](https://github.com/high1/solid-jsx/blob/main/LICENSE).

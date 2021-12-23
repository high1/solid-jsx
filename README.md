# solid-jsx

## What?

Use Solid components with [mdx](https://mdxjs.com/).

## Installation

```sh
pnpm install --save-dev solid-jsx
```
## Usage

> This library is meant to be used alongside [@mdx-js](https://mdxjs.com/), version 2, by setting the jsxImportSource to __'solid-jsx'__.  
You can use official integration with various bundlers, and frameworks, below is a configuration sample  
for [Vite](https://vitejs.dev), which supports rollup plugins.

```js
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({

  plugins: [mdx({ jsxImportSource: 'solid-jsx', remarkPlugins: [remarkGfm]}), solid()],
  build: {
    target: "esnext",
  },
});
```
More information -> [Integrations](https://mdxjs.com/docs/getting-started/#integrations).

> All markdown tags and custom components replacement should be supported.

```js
const options: Record<string, Component> = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing
}
...
<Message 
  components={{
    h2: 'h6',
    h1: () => <div>Test</div>,
    Planet: () => <Dynamic component={options[selected()]} />,
}}>
```

> However, since the code goes through the @mdx-js compiler and then in the jsx function in solid-jsx,
this will not be reactive:

```js
const [tag, setTag] = createSignal('p')
<Message 
  components={{
    h2: tag(),
}}>
```
You can use Dynamic tag here:

```js
const [tag, setTag] = createSignal('p')
<Message 
  components={{
    h2: (props: PropsWithChildren) => <Dynamic component={tag()} {...props} />,
}}>
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

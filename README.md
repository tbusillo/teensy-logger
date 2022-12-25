<br/>
<h1 align="center">
  WIP - Teensy Tiny TypeScript Package
</h1>
<p align="middle">
  A lightweight template to make your next project just a litle easier.
  </p>
<br/>
<p align="center">
  <a href="https://github.com/tbusillo/teensy-typescript-package/actions/workflows"><img src="https://github.com/tbusillo/teensy-typescript-package/actions/workflows/test.yml/badge.svg" alt="CI status"></a>
</p>
<br/>

## Features

- [TypeScript](https://www.typescriptlang.org/) right from the start
- Bundling using [Rollup](https://github.com/rollup/rollup) and [unbuild](https://github.com/unjs/unbuild) with native supports for `ESM/CJS` packages
- Unit testing using [jest](https://jestjs.io/) / `ts-jest`
- [ESLint](https://github.com/eslint/eslint), [prettier](https://github.com/prettier/prettier), and git hooks with [Husky](https://github.com/typicode/husky)
- CI/CD workflows using [Github Actions](https://docs.github.com/en/actions)
- Extendable configurations (e.g., tsconfig) perfect for use in monorepos

## Installation

Using the Github UI, [create a new repository](https://github.com/tbusillo/teensy-typescript-package/generate) based on this template.

You can also clone it using the below:

```bash
git clone git@github.com:tbusillo/teensy-typescript-package.git

# install the dependencies
pnpm install && pnpm build && pnpm dev
```

## Getting Started

```bash
# clone the template via Github.com or...
git clone git@github.com:tbusillo/teensy-typescript-package.git

# OR, go to

# install dependencies
pnpm install

# stub /dist - great for use with playgrounds/monorepos
pnpm dev # pnpm stub --dev

# Run tests
pnpm test

# Lint / format
pnpm lint

# Run with nodemon (reload on file change) and transpile with TSC
pnpm start

# Build package
pnpm build

# Clean /dist cache
pnpm clean

# Install git hooks
pnpm prepare
# Install git hooks
pnpm prepare
```

## Releasing

If you intend to distribute your package via a manager (e.g., `npm`, `yarn`, etc), this template
includes [standard-version](https://github.com/conventional-changelog/standard-version).

To run a release, update the included `./.npmrc` with the URL of the

## License

MIT License

Copyright (c) 2022 Tom

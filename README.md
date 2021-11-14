# win-attr

Lightweight dependency-free Node.js package to get and set filesystem attributes in Microsoft Windows.

## Installation

```sh
npm install win-attributes
# or
yarn add win-attributes
```

## Usage

```ts
import { getAttributes, FileAttribute, setAttributes, SetAttributes  } from 'win-attributes';

(async () => {
  // retrieve attributes
  const path = '/path/to/directory';
  const attributes = await getAttributes(path);
  if (attributes.hidden) {
    console.log(`${path} is hidden`);
  }

  // set attributes
  const settings: SetAttributes = {
    [FileAttribute.Hidden]: false,
    [FileAttribute.Readonly]: false,
  };
  await setAttributes(path, settings);
})();
```

## Development

```sh
# install dependencies
npm install

# lint
npm run lint

# run example
npm run example

# run tests
npm run test

# build
npm run build
```

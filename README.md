# metro-minify-obfuscator

A metro minifier based on [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) for React Native

## Installation

```bash
yarn add -D metro-minify-obfuscator
```

or

```bash
npm i --save-dev metro-minify-obfuscator
```

## Usage

- update `metro.config.js` on your project

```js
module.exports = {
  transformer: {
    ...
    minifierPath: 'metro-minify-obfuscator', // <- add this
    minifierConfig: {}, // <- put additional javscript-obfuscator configuration here
  },
};
```

- you can add [additional obfuscation](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) config to the `minifierConfig` properties (⚠️ **NOT ALL OPTION IS SUPPORTED ON REACT-NATIVE, IT MIGHT MAKE YOUR CODE NOT WORKING** )
- run packager with `--reset-cache` argument to clear metro cache

## Default Options

```json
{
    "stringArray": false,
    "compact": true,
    "controlFlowFlattening": true,
    "controlFlowFlatteningThreshold": 0.75,
    "identifierNamesGenerator": "hexadecimal",
    "numbersToExpressions": true,
    "splitStrings": true,
    splitStringsChunkLength: 3,
    "transformObjectKeys": true,
    "simplify": true,
    "disableConsoleOutput": true,
    "log": false,
    "selfDefending": true,
    "unicodeEscapeSequence": true,
}
```
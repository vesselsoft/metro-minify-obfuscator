# metro-minify-obfuscator

A metro minifier based on [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) for React Native

# Installation

```bash
yarn add -D metro-minify-obfuscator
```

or

```bash
npm i --save-dev metro-minify-obfuscator
```

# Usage

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

# Default Options

```json
{
    "inputFileName": filename, // not recommended to override
    "reservedNames": reserved, // not recommended to override
    "sourceMap": true, // not recommended to override
    "sourceMapSourcesMode": "sources", // not recommended to override
    "target": "browser-no-eval",
    "stringArray": false,
    "compact": true,
    "controlFlowFlattening": true,
    "controlFlowFlatteningThreshold": 0.8,
    "identifierNamesGenerator": "hexadecimal",
    "numbersToExpressions": true,
    "splitStrings": true,
    "transformObjectKeys": true,
    "simplify": true,
    "disableConsoleOutput": true,
    "log": false,
    "selfDefending": true,
    "unicodeEscapeSequence": true,
}
```

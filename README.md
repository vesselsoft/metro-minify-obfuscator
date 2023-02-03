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
    minifierConfig: {
      "defaultMinifierPath": require('metro-minify-uglify'), // required if filter/includeNodeModules options is set, can be metro-minify-uglify or metro-minify-terser dependes on RN version / available installed minifier
      "filter": (filename) => true, // return true to obfuscate
      "includeNodeModules": true, // set false to ignore node_modules from obfuscation
      "obfuscatorOptions": {
        // put additional javscript-obfuscator configuration here
      }
    },
  },
};
```

- you can add [additional obfuscation](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) config to the `minifierConfig` properties (⚠️ **NOT ALL OPTION IS GUARANTEED WORKING ON REACT-NATIVE, IT MIGHT BREAK YOUR APPS 🙈** )
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
  "splitStringsChunkLength": 3,
  "transformObjectKeys": true,
  "simplify": true,
  "disableConsoleOutput": true,
  "log": false,
  "selfDefending": true,
  "unicodeEscapeSequence": true
}
```

# Release History

- **v1.0.0** - Add additional option to filter / exclude node_modules file from obfuscation. ⚠️ **upgrading to this version need update to your metro.config.js please be aware**

```js
// before
module.exports = {
  transformer: {
    ...
    minifierPath: 'metro-minify-obfuscator', // <- add this
    minifierConfig: {
      // put additional javscript-obfuscator configuration here
    },
  },
};

// after
module.exports = {
  transformer: {
    ...
    minifierPath: 'metro-minify-obfuscator', // <- add this
    minifierConfig: {
      defaultMinifierPath: require('metro-minify-uglify'), // required if filter/includeNodeModules options is set, can be metro-minify-uglify or metro-minify-terser dependes on RN version / available installed minifier
      filter: (filename) => true, // return true to obfuscate
      includeNodeModules: true, // set false to ignore node_modules from obfuscation
      obfuscatorOptions: {
        // put additional javscript-obfuscator configuration here
      }
    },
  },
};
```

- **v0.x.x** - Initial fork from `metro-minify-uglify` configured with JSO library

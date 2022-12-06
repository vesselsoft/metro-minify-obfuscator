/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

"use strict";

const jso = require("javascript-obfuscator");

function obfuscator(options) {
  const result = obfuscate(options);

  if (!options.map || result.map == null) {
    return { code: result.code };
  }

  const map = JSON.parse(result.map);

  return { code: result.code, map: { ...map, sources: [options.filename] } };
}

function obfuscate({ code, reserved, config, filename }) {
  const result = jso.obfuscate(code, {
    sourceMap: true,
    inputFileName: filename,
    sourceMapSourcesMode: "sources",
    reservedNames: reserved,
    target: "browser-no-eval",
    stringArray: false,
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.8,
    identifierNamesGenerator: "hexadecimal",
    numbersToExpressions: true,
    splitStrings: true,
    transformObjectKeys: true,
    simplify: true,
    disableConsoleOutput: true,
    log: false,
    selfDefending: true,
    unicodeEscapeSequence: true,
    ...config,
  });

  return {
    code: result.getObfuscatedCode(),
    map: result.getSourceMap(),
  };
}

module.exports = obfuscator;

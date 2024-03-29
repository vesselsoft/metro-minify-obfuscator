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
const composer = require("multi-stage-sourcemap").transfer;

function obfuscator(options) {
  const { config } = options;
  const isFiltered = !!config.filter && config.filter(options.filename);
  const isNMFile = options.filename.indexOf("node_modules") >= 0;
  const includeNM = isNMFile && (config.includeNodeModules ?? true) === true;

  if (!config.defaultMinifierPath || isFiltered || includeNM || !isNMFile) {
    if (config.trace) {
      console.log("Obfuscating " + options.filename);
    }
    return runJSO(options);
  }

  if (config.trace) {
    console.log("Skip obfuscating " + options.filename);
  }

  return require(config.defaultMinifierPath)({
    ...options,
    config: config.defaultMinifierConfig ?? {},
  });
}

function runJSO(options) {
  const result = obfuscate(options);

  if (!options.map || result.map == null) {
    return { code: result.code };
  }

  const map = JSON.parse(
    composer({
      fromSourceMap: JSON.parse(result.map),
      toSourceMap: options.map,
    })
  );
  map["sources"] = [options.filename];

  return { code: result.code, map };
}

function obfuscate({ code, reserved, config, filename }) {
  const result = jso.obfuscate(code, {
    sourceMap: true,
    inputFileName: filename,
    stringArray: false,
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    identifierNamesGenerator: "hexadecimal",
    numbersToExpressions: true,
    splitStrings: true,
    splitStringsChunkLength: 3,
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

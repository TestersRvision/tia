'use strict';

import { dirSep } from 'path';
import util from 'util';

/* globals gIn */

export function removeSelSid(str) {
  const re = /\?_dc=\d+/g;
  return str.replace(re, '');
};

export function filterStack(strStack) {
  const stArr = strStack.split('\n');
  const newArr = stArr.filter((el) => {
    const startingFrom = el.indexOf('/tia/');
    return el.indexOf(`${dirSep}node_modules${dirSep}`, startingFrom) === -1;
  });
  return newArr.join('\n');
};

export function excToStr(err, noStack) {
  if (typeof err === 'undefined') {
    return '\nNo Exception info\n';
  }
  let errStr = err.toString();// (typeof err.message === 'undefined') ? err : err.message;
  if (/* gIn.params.stackToLog || */!noStack) {
    if (typeof err.stack !== 'undefined') {
      errStr += `\n${exports.filterStack(err.stack)}`;
    } else {
      errStr += '\n No stack trace\n';
    }
  }
  return errStr;
};

export function winToUnixSep(path) {
  return path.replace(/\\\\/g, '/');
};

export function changeExt(jsPath, newExt) {
  return jsPath.substr(0, jsPath.length - 3) + newExt;
};

export function jsToEt(jsPath) {
  return exports.changeExt(jsPath, '.et');
};

/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
export function jsToLog(jsPath) {
  return exports.changeExt(jsPath, '.log');
};

export function jsToDif(jsPath) {
  return exports.changeExt(jsPath, '.dif');
};

export function expandHost(str) {
  return str.replace('$(host)', gIn.config.selHost);
};

export function collapseHost(str) {
  return str.replace(gIn.config.selHost, '$(host)');
};

export function valToStr(value) {
  if (Buffer.isBuffer(value)) {
    return value.toString('utf8');
  }

  if (typeof value === 'string') {
    return value;
  }

  return util.inspect(value, { compact: false, sorted: true, depth: Infinity });
};

// function escapeRegExp(string) {
//   return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// }
//
// exports.prepareHostRE = function(){
//  let str = escapeRegExp(gIn.config.selHost);
//  exports.hostRe = new RegExp(str, g);
// };

//  // Multi-line version.
// exports.collapseHostML = function(str){
//  // TODO: optimize, this function should be called only if gIn.config.selHost is changed.
//  // For now there are not even such use cases.
//  exports.prepareHostRE();
//  return str.replace(exports.hostRe, '$(host)');
//  };

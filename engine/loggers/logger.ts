'use strict';

/* globals gT: true */
/* globals gIn: true */

/*
 Inner utils for logging.
 */
import fs from 'fs';

import * as nodeUtils from '../../utils/nodejs-utils';

let isVerbose: boolean;

function logToFile(msg: string) {
  // TODO: check how diff work for unicode.
  fs.appendFileSync(exports.logFile, msg, { encoding: gT.engineConsts.logEncoding });
}

// function logToFileLn(msg) {
//   return logToFile(`${msg}\n`);
// }

/**
 * Logs to file and writes to console (if console output is enabled).
 * @param msg
 * @param noConsole
 */
export function log(msg: string, dontWriteToFile: boolean) {
  // We use append here, to don't lost some strings if something will break the test engine.
  gIn.cLogger.logIfEnabled(msg);
  if (!dontWriteToFile) {
    logToFile(msg);
  }
};

export function logln(msg: string) {
  exports.log(`${msg}\n`);
};

export function logResourcesUsage(prefix = '') {
  if (gIn.config.resUsagePrintAtErrors) {
    exports.logln(prefix + nodeUtils.getResourcesUsage(true));
  }
};

export function logBold(msg: string) {
  gIn.cLogger.logBold(msg);
  logToFile(msg);
};

export function fail(msg: string) {
  gIn.cLogger.failIfEnabled(msg);
  logToFile(msg);
};

export function pass(msg: string) {
  gIn.cLogger.passIfEnabled(msg);
  logToFile(msg);
};

/**
 * Report about some error.
 * @param msg
 */
export function error(msg: string) {
  const msgNew = gIn.loggerCfg.errPrefix + msg;
  gIn.cLogger.errIfEnabled(msgNew);
  logToFile(msgNew);
};

export function errorln(msg: string) {
  return exports.error(`${msg}\n`);
};

/**
 * Report about some exception.
 * @param msg
 * @param e
 */
export function exception(msg: string, e: Error | any) {
  const msgNew = gIn.loggerCfg.excPrefix + msg;
  gIn.cLogger.errIfEnabled(`${msgNew} ${gIn.textUtils.excToStr(e)}\n`);
  logToFile(`${msgNew} ${gIn.textUtils.excToStr(e, !gIn.params.stackToLog)}\n`);
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean}[enable]. If true log is enabled, othwerwise log is disabled.
 */
export function logIfEnabled(msg: string, enable: boolean) {
  let dontWriteToFile = false;
  if (!enable && gIn.params.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg, dontWriteToFile);
  }
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean} [enable = gIn.loggerCfg.defLLLogAction] - If false - log is disabled,
 * otherwise - log is enabled.
 */
export function logIfNotDisabled(msg: string, enable = gIn.loggerCfg.defLLLogAction) {
  let dontWriteToFile = false;
  if (!enable && gIn.params.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg, dontWriteToFile);
  }
};

function writeStrToFile(str: string/* , diffed, isDif*/) {
  fs.writeSync(exports.fd, str, null, gT.engineConsts.logEncoding);
}

function writeStrToStdout(str: string, diffed: number, isDif: boolean) {
  // str = str.replace(/\s+$/g, '');
  // str += '\n';
  if (diffed) {
    gIn.cLogger.err(str);
  } else if (isDif) {
    gIn.cLogger.msgDifStr(str);
  } else {
    gIn.cLogger.msg(str);
  }
}

let writeLogStr = writeStrToFile;

function writeToSuiteLog(str: string, diffed: number, isDif: boolean) {
  writeLogStr(str, diffed, isDif);
}

export function testSummary() {
  exports.log('=================\n');
  exports.log(`Pass: ${gIn.tInfo.data.passed}, Fail: ${gIn.tInfo.data.failed}\n`);
};

function saveDirInfoToSuiteLog(parameters) {
  let { indent } = parameters;
  const { noTestDifs } = parameters;
  const {
    dirInfo, verbose, noTime,
  } = parameters;
  gIn.tracer.msg3(`${dirInfo.path}, dirInfo.run: ${dirInfo.run}`);
  if (!dirInfo.run && !gT.suiteConfig.emptyDirToSuiteLog) {
    return;
  }
  writeToSuiteLog(indent);
  writeToSuiteLog(gIn.tInfo.testInfoToString({
    curInfo: dirInfo,
    isDir: true,
    verbose,
    noTime,
  }), dirInfo.diffed);
  indent = gIn.loggerCfg.indentation + indent;

  // If directory is empty there will be empty array.
  // Absense of 'children' property says that it is test and not directory,
  // we should not allow to use this function for not directory.
  const len = dirInfo.children.length;
  for (let i = 0; i < len; i++) {
    const curInfo = dirInfo.children[i];
    if (curInfo.diffed || verbose) {
      if (Object.prototype.hasOwnProperty.call(curInfo, 'children')) {
        saveDirInfoToSuiteLog({
          dirInfo: curInfo,
          indent,
          verbose,
          noTime,
          noTestDifs,
        });
      } else {
        writeToSuiteLog(indent);
        writeToSuiteLog(gIn.tInfo.testInfoToString({
          curInfo, isDir: false, verbose, noTime,
        }), curInfo.diffed);
        if (curInfo.diffed && gIn.params.difsToSlog && !isVerbose && !noTestDifs) {
          const difPath = gIn.textUtils.jsToDif(curInfo.path);
          const dif = fs.readFileSync(difPath, gT.engineConsts.logEncoding);
          writeToSuiteLog(`${indent}============== DIF ============== \n`);
          const diffStrs = dif.split('\n');
          diffStrs.forEach((str) => {
            writeToSuiteLog(indent);
            writeToSuiteLog(`${str}\n`, false, true);
          });
          writeToSuiteLog(`${indent}========== END OF DIF  ========== \n`);
        }
      }
    }
  }
}

function saveSuiteLogPart({
  verbose,
  dirInfo,
  noTime,
  noTestDifs,
}) {
  isVerbose = verbose;
  const title = verbose ? 'Verbose' : 'Short';
  const decor = '====================';
  writeToSuiteLog(`${decor}    ${title} Log BEGIN:    ${decor}\n`);
  saveDirInfoToSuiteLog({
    dirInfo,
    indent: '',
    verbose,
    noTime,
    noTestDifs,
  });
  writeToSuiteLog(`${decor}    ${title} Log END.    ${decor}\n`);
}

/**
 * Saves suite log.
 * @param dirInfo
 * @param log
 * @parem noTime
 * @returns {string} - Verbose info for the root test directory.
 */
export function saveSuiteLog({
  dirInfo,
  log,
  noTime,
  noTestDifs,
}) {
  writeLogStr = writeStrToFile;
  exports.fd = fs.openSync(log, 'w');
  saveSuiteLogPart({
    verbose: false, dirInfo, noTime, noTestDifs,
  });
  fs.writeSync(exports.fd, '\n', null, gT.engineConsts.logEncoding);
  saveSuiteLogPart({
    verbose: true, dirInfo, noTime, noTestDifs,
  });
  fs.closeSync(exports.fd);
  return gIn.tInfo.testInfoToString({
    curInfo: dirInfo, isDir: true, verbose: true, noTime, noTitle: true, noEol: true,
  });
};

/* Prints expected tests results to stdout and unexpected to stderr */
export function printSuiteLog(dirInfo, noTestDifs) {
  writeLogStr = writeStrToStdout;
  saveSuiteLogPart({ verbose: false, dirInfo, noTime: false, noTestDifs });
  writeToSuiteLog('\n');
  saveSuiteLogPart({ verbose: true, dirInfo, noTime: false, noTestDifs });
};
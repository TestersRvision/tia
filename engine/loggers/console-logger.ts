'use strict';

/* globals gT, gIn */

let chalk;
let isChalkEnabled = false; // Just to speed up checking boolean instead of Boolean(object).

if (!process.env.TIA_NO_COLORS) {
  process.env.FORCE_COLOR = '1';
  chalk = require('chalk');
  isChalkEnabled = true;
}

// exports.chalk = chalk;
// exports.isChalkEnabled = isChalkEnabled;

/**
 * Tracks EOL of last message printed to console.
 * Also msg can be boolean - true means there is EOL.
 * @param msg
 */
function trackEOL(msg) {
  if (msg === true || Boolean(msg.match(/(\n|\r)$/))) {
    gIn.tracePrefix = '';
  } else {
    gIn.tracePrefix = '\n';
  }
}

/**
 * Writes message to stdout as is.
 * @param message
 */
export function msg(message) {
  process.stdout.write(message);
  trackEOL(message);
};

export function msgln(msg) {
  exports.msg(`${msg}\n`);
};

export function logResourcesUsage(prefix = '') {
  // if (gIn.config.resUsagePrintAtErrors) {
  exports.msgln(prefix + gT.nodeUtils.getResourcesUsage(true));

  // }
};

/**
 *
 * @param chalkProps - string or array.
 * @param msg
 * @returns {*}
 */
export function chalkWrap(chalkProps, msg) {
  let resMsg = msg;
  if (isChalkEnabled) {
    if (typeof chalkProps === 'string') {
      resMsg = chalk[chalkProps](resMsg);
    } else {
      chalkProps.forEach((prop) => {
        resMsg = chalk[prop](resMsg);
      });
    }
  }
  return resMsg;
};

/**
 * Writes string from dif to console.
 * @param msg
 */
export function msgDifStr(msg) {
  process.stdout.write(exports.chalkWrap(['yellow', 'bold'], msg));
  trackEOL(msg);
};

/**
 * Writes string for debug tracing.
 * @param msg
 */
export function msgDbg(msg) {
  process.stdout.write(`${exports.chalkWrap(['cyan', 'bold'], msg)}\n`);
  trackEOL(true);
};

/**
 * Writes msg to stdout using red ANSI color code.
 * @param msg
 */
export function err(msg) {
  let resMsg = msg;
  if (isChalkEnabled) {
    resMsg = chalk.red(resMsg);
  }
  process.stdout.write(resMsg);
  trackEOL(resMsg);
};


export function errln(msg) {
  exports.err(`${msg}\n`);
};

// =====================================

/**
 * Writes msg to stdout if corresponding parameter is specified in cmd line.
 * Otherwise - does nothing.
 * @param msg
 */
export function logIfEnabled(msg) {
  if (gIn.params.logToConsole) {
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};

/**
 *
 * @param msg
 * Prefix should be set in caller.
 */
export function errIfEnabled(msg) {
  if (gIn.params.errToConsole) {
    return exports.err(msg);
  }
};

export function passIfEnabled(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.green(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};

export function failIfEnabled(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.red(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};

// =====================================

export function logBold(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.bold(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};

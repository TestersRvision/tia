'use strict';

/* globals gT: true */
/* globals gIn: true */

// Test engine init.
// Fills the gT global object, which will be used in all tests and in the test engine.

import path = require('path');

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + path.dirname(process.execPath);
process.env.SELENIUM_PROMISE_MANAGER = '0';
import wdModule from 'selenium-webdriver';

// import { AsyncResource } from 'async_hooks';

// interface SeleniumOriginal {
//   wdModule: any,
//   driverLogType: string,
//   browserLogType: string,
// }

// interface GlobalTestObject {
//   sOrig: SeleniumOriginal,
// }

// interface GlobalInnerObject {
//   // sOrig: SeleniumOriginal,
// }

// export interface Global {
  // gT: GlobalTestObject,
  // gIn: GlobalInnerObject,
// }

// declare const global: any;

const sOrig = {
  browserLogType: wdModule.logging.Type.BROWSER,
  driverLogType: wdModule.logging.Type.DRIVER,
  wdModule,
};

// global.gIn = {}; // Global object as namespace for inner objects.

// gIn
import * as configUtils from '../utils/config-utils';

// gIn.configUtils = configUtils;

// gT
import engineConsts from '../config/engine-constants';

// gT
import suiteConfigDefault from '../config/default-suite-config';

// gT
import globalConfigDefault from '../config/default-global-config';

// gT
import dirConfigDefault from '../config/default-dir-config';

// gIn
import * as loggerCfg from './loggers/logger-cfg';

// gIn
import * as cLogger from './loggers/console-logger';

// gIn
import * as api from '../api/api-index';

// gIn
import * as logger from './loggers/logger';

// gIn
import * as tracer from './tracer';

// gT
import commonConsts = require('../common-utils/common-constants');
import commonMiscUtils = require('../common-utils/common-misc-utils');

// gIn
import * as fileUtils from '../utils/file-utils';

// gIn
import * as textUtils from '../utils/text-utils';

// gT
import * as timeUtils from '../utils/time-utils';

// gIn
import * as tInfo from './test-info';

// gIn
import * as diffUtils from '../utils/diff-utils';

// gIn
import * as mailUtils from '../utils/mail-utils';

// gIn
import * as remoteDriverUtils from '../utils/remote-driver-utils';

// gT
import * as nodeUtils from '../utils/nodejs-utils';

import * as log from '../api/log/log';
import rStreamToLog from '../api/log/r-stream-to-log';
import winstonMock from '../api/log/winston-mock';

// gIn
import * as wrap from './wrap';

// const globalAny: Global = global;

global.gT = {
  browsers: [
    'chrome', // First browser is default.
    'phantomjs',
    'firefox',
  ],

  // Js utils common for browser and node.js.
  commonConsts,
  commonMiscUtils,

  dirConfigDefault,
  engineConsts,
  globalConfigDefault,
  l: log,

  logUtils: {
    rStreamToLog,
    winstonMock,
  },

  nodeUtils,
  sOrig,
  suiteConfigDefault,
  timeUtils,
  version: '',
};

global.gIn = {
  api,
  cLogger,
  configUtils,
  diffUtils,
  fileUtils,
  logger,
  loggerCfg,
  mailUtils,
  remoteDriverUtils,
  tInfo,
  textUtils,
  tracePrefix: '',
  tracer,
  wrap,
};


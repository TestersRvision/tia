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

declare const global: any;

const sOrig = {
  wdModule,
  driverLogType: wdModule.logging.Type.DRIVER,
  browserLogType: wdModule.logging.Type.BROWSER,
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
import * as globalConfigDefault from '../config/default-global-config';

// gT
import * as dirConfigDefault from '../config/default-dir-config';

// gIn
import loggerCfg from './loggers/logger-cfg';

// gIn
import cLogger from './loggers/console-logger';

// gIn
import api from '../api/api-index';

// gIn
import * as logger from './loggers/logger';

// gIn
import * as tracer from './tracer';

// gT
import commonMiscUtils = require('../common-utils/common-misc-utils');

// gT
import commonConsts = require('../common-utils/common-constants');

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

// gIn
import * as wrap from './wrap';

global.gT = {
  sOrig,
  engineConsts,
};

global.gIn = {
  configUtils,
};

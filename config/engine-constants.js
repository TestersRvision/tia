'use strict';

// Конфиги для всех test suites. Не перегружаются нигде.
module.exports = {

  rootDirEnvVarName: 'TIA_ROOT_DIR',

  // Directory name for tests suite. Only tests from this directory are launched.
  // The project can contain many test suites.
  suiteDirName: '__tests__',

  // Name for subdirectory inside <suiteDirName> directory that keeps the suite results:
  // * Suite etalog log.
  // * Current suite logs in various formats.
  // The <project root>/__tests__ also contains such a directory with project level results.
  resultsSubDirName: '__tia__',

  logExtension: '.log',

  etalonExtension: '.et',

  suiteLogName: 'suite',

  rootLogName: 'root',

  requireModulesEnvVarName: 'TIA_REQUIRE_MODULES',

  // These patterns are ignored.
  patternsToIgnore: [/^\./, /^node_modules$/],

  emailCfgPathEnvVarName: 'TIA_EMAIL_CFG_PATH',

  externalLogEnvVarName: 'TIA_EXTERNAL_LOG',

  // File name for directory configs.
  dirConfigName: 'tia-dir-config.js',

  // File name for the root directory config.
  // There is the only such file and it must be located in <rootDir>/__tests__ directory.
  dirRootConfigName: 'tia-root-dir-config.js',

  // File name for suite configs.
  suiteConfigName: 'tia-suite-config.js',

  // File name for the root suite config.
  // There is the only such file and it must be located in <rootDir>/__tests__ directory.
  suiteRootConfigName: 'tia-root-suite-config.js',

  // Корневая директория, где лежат профайлы. Не перегружается в локальных конфигах.
  browserProfileRootDirName: 'tia-browser-profiles',

  // Дефолтный дисплей для GUI тестов.
  // Сохраняем состояние в момент старта.
  defDisplay: process.env.DISPLAY,

  // TODO: Имя лога для git pull, этот лог посылается на почту.
  gitPullLog: 'gitpull.log',

  // File name for PID for remote chrome driver.
  remoteChromeDriverPid: 'cd.pid',

  // File name for PID for remote chrome driver.
  remoteChromeDriverSid: 'cd.sid',

  logEncoding: 'utf8', // ascii

  selfTestsEtSLog: 'tests.et', // TODO

  selfTestsExtLog: 'ext-log.log', // TODO

  hangTimeout: 60000, // Timeout (ms) after which action function considered as hanging.

  tooLongTime: 1e12, // If tests exceeded this duration (ms) the TOO_LONG prefix will be added to email subject.

  defaultWaitTimeout: 30000, // Default timeout for e.wait functions.,

  // Delay before click on ExtJs element. It seems like ExtJs does not handle
  // too fast clicking.
  extJsClickDelay: 0, // milliseconds.

  maxRecursiveErrCountForTest: 2, // Maximum recursive errors count for one test.

  // Maximum tests count with recursive errors if this limit is exceeded
  // all tests will be cancelled.
  maxTestCountWithRecursiveError: 2,

  // Comboboxes have a glitch, at one left click they can open boundList and immediately close it.
  // This constant sets how many times tia will retry to click comboboxes if bound List is not opened.
  // If retry count is 0 the only one attempt to click combobox will be performed.
  cbRetryClicksCount: 2,

  cbBoundListTimeout: 5000, // milliseconds for waiting of bound list to be opened after click on combobox.

  // milliseconds for waiting of ajax requests after clicks.
  // This is actual for lazy loading some stuff at clicking.
  // TODO: increase after good debugging. For now low value is needed to detect unstable parts.
  ajaxTimeoutAfterClick: 15000,

  elGetTextFail: 'ElGetTextFail', // The error message for getText fail for Web Element.

  defIsPassCountingEnabled: true, // Default value of pass counting for tests.

  defLLLogAction: true, // Default value for low level actions logging.

  remoteDriverStartDelay: 2000, // The time for remote driver to start.

  mailWaitTimeout: 20, // Seconds. If we failed to send mail we will wait this amount of seconds and retry.

  mailAttemptsCount: 10, // Times. If we failed to send mail we will retry this amount of times.

  // Дефолтный уровень сообщений, отлавливаемых в консоли браузера.
  // Из-за этих сообщений могут быть дифы. Ближе к релизу можно ставить 900 (WARNING).
  // http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Level.html
  defaultBrowserLogLevel: 1000,

  // Дефолтный уровень логирования для драйвера.
  defaultDriverLogLevel: 900,

  // https://bugs.chromium.org/p/chromedriver/issues/detail?id=817#c21
  // TODO: use this if --dns-prefetch-disable will not work.
  defaultDelayAfterDriverCreate: 2000, // Delay after webdriver create to avoid error.

  // Error message for force test case cancelling.
  CANCELLING_THE_TEST: 'Force cancelling the test',

  // Error message for force test suite cancelling.
  CANCELLING_THE_SUITE: 'Force cancelling the suite',

};

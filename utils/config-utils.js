'use strict';

/* globals gT: true, gIn: true */

const path = require('path');
const nodeUtils = require('../utils/nodejs-utils.js');
const _ = require('lodash');

// Returns merged config for suite.
exports.handleSuiteConfig = function handleSuiteConfig() {
  let localSuiteConfig = {};

  // TODO: current suite dir.
  try {
    localSuiteConfig = nodeUtils.requireEx(gIn.suite.configPath, true).result;
  } catch (e) {
    gIn.tracer.msg2(e);
    gIn.tracer.msg2(`There is no Suite Config: ${gIn.suite.configPath}`);
  }
  gT_.suiteConfig = _.merge(_.cloneDeep(gT.rootSuiteConfig), localSuiteConfig);
};

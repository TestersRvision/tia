'use strict';

import path from 'path';

import {appendFileSync} from 'fs';

import * as fileUtils from './file-utils';

export function getNoEtalonTestsInfoPath() {
  const noEtalonTestsPath = path.join(
    gIn.suite.root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.noEtalonTests
  );
  return noEtalonTestsPath;
};

export function saveNewTestInfo(testPath) {
  const pathToAdd = path.relative(gIn.suite.root, testPath);
  appendFileSync(exports.getNoEtalonTestsInfoPath(), `${pathToAdd}\n`, 'utf8')
};

export function rmNewTestsInfo() {
  fileUtils.safeUnlink(exports.getNoEtalonTestsInfoPath());
};

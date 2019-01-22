'use strict';

export interface Suite {
  root: string; // path to tests root.
  browserProfilePath: string;
  log: string;
  etLog: string;
  configPath: string;
  changedEDiffs: number;
}

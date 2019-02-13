import { Teq } from './common';

interface TeqParamsForCmpInfo {
  tEQ: Teq;

  /**
   * Extra element name for log. E.g. if there is no id.
   */
  elNameForLog?: string;

  /**
   * Should action be logged? By default - default settings will be used,
   * e.g. don't log actions inside high level action and log other actions.
   */
  logAction?: boolean;
}

interface TeqParams extends TeqParamsForCmpInfo {
  /**
   * Action to perform.
   * This is arbitrary javascript code.
   * The scope contains variables cmp and cmpInfo, and your script can use them,
   * and return whatever you want.
   */
  action: string;
}

type CmpInfo = any;

export interface TeqApi {
  queryAndAction(args: TeqParams): any;
  queryCmpInfo(args: TeqParamsForCmpInfo): CmpInfo;
  queryCmpId(tEQ: Teq, elNameForLog ?: string, logAction ?: boolean): string;
}
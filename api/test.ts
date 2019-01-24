'use strict';

/* globals gIn: true */

/*
 Utilities for tests.
 */

/**
 * Sets the test title.
 * @param title
 */
export function setTitle(title: string) {
  gIn.tInfo.data.title = title; // From global sandbox.
  gIn.logger.logln('=================');
  gIn.logger.logBold(`Title: ${title}\n`);
};

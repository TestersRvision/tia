'use strict';

/* globals gT: true */
/* globals gIn: true */

const path = require('path');

const chromeDriverPath = require('chromedriver').path;

process.env.PATH = chromeDriverPath + path.delimiter + process.env.PATH;
gIn.chromeDriverPath = chromeDriverPath;

gT.sOrig.chrome = require('selenium-webdriver/chrome');
gT.sOrig.Executor = require('selenium-webdriver/http').Executor;
gT.sOrig.Client = require('selenium-webdriver/http').HttpClient;
gT.sOrig.firefox = require('selenium-webdriver/firefox');

gT.sOrig.by = gT.sOrig.wdModule.By;
gT.sOrig.until = gT.sOrig.wdModule.until;
gT.sOrig.ActionSequence = gT.sOrig.wdModule.ActionSequence;
gT.sOrig.key = gT.sOrig.wdModule.Key;

// gT.sOrig.driver is set by gT.sOrig.driver.init.

// gIn.s = {};
gT.s.driver = require('./sel-driver');
require('./sel-misc');
gT.s.wait = require('./sel-waits');
gT.s.uA = require('./sel-user-actions');
gT.s.browser = require('./sel-browser');
gT.s.hL = require('./sel-hl');
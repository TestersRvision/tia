'use strict';

// This intermediate process is needed because WebStorm closes detached child processes
// when stops debugging.

import {ChildProcess, spawn} from 'child_process';
import * as fs from 'fs';

const errorReportFilePath = '/home/alexey/projects/work/tia-tests/fname';

process.on('message', (data) => {
  let child: ChildProcess;

  try {
    child = spawn(
      data.chromeDriverPath,
      [`--port=${data.port}`],
      {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
      });

    // Save the pid.
    fs.writeFileSync(data.pidPath, child.pid, 'utf8');
  } catch (err) {
    fs.appendFileSync(errorReportFilePath, `${err}\n`, 'utf8');
  }

  setTimeout(() => {
    try {
      child.unref();
      if (process.send) {
        process.send('chromedriver started');
      }
      process.disconnect();
      process.exit(0);
    } catch (err) {
      fs.appendFileSync(errorReportFilePath, `${err}\n`, 'utf8');
    }
  }, data.waitAfterStart);
});

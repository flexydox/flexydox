#!/usr/bin/env node
'use strict';

async function main() {
  if (process.platform === 'win32') {
    const cwd = process.cwd();
    // Upper case the drive letter on Windows
    const correctedCwd = cwd.slice(0, 1).toUpperCase() + cwd.slice(1);
    if (correctedCwd !== cwd) {
      process.chdir(correctedCwd);
    }
  }

  return import('./dist/main.js')
    .then(({ cli }) => cli(process.argv))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

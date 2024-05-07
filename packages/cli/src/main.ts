import { program } from 'commander';
import { buildAction } from './actions/build-action';
import { buildSchemaAction } from './actions/build-schema-action';

import { parseConfigFile } from './utils/parse-config-file';

import { setLogLevel } from '@flexydox/logger';
import { getConfig } from './config/app-config';

program.name('flexydox').description('Flexydox CLI').version('0.0.1');

export async function cli(args: string[]) {
  program.hook('preAction', async () => {
    const configPath = program.opts()?.config;
    const verbose = program.opts()?.verbose;
    const veryVerbose = program.opts()?.veryVerbose;
    if (verbose) {
      setLogLevel('debug');
    }
    if (veryVerbose) {
      setLogLevel('trace');
    }

    await parseConfigFile(configPath);
    const cfg = getConfig();
    if (!cfg) {
      program.help();
      program.error('', { code: 'CFG_ERROR', exitCode: 1 });
    }
  });

  program.option('-c, --config <path>', 'Path to the config file');

  program.option('-v, --verbose', 'Verbose mode');
  program.option('-vv, --very-verbose', 'Very verbose mode');

  program.command('build').description('Build documentation').action(buildAction);
  program
    .command('build-schema')
    .description('Build schema json file only')
    .action(buildSchemaAction);
  program.command('preview').description('Build and preview documentation').action(buildAction);

  await program.parseAsync(args);
}

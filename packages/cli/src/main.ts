import { program } from 'commander';
import { buildAction } from './actions/build-action';
import { buildSchemaAction } from './actions/build-schema-action';

import { parseConfigFile } from './utils/parse-config-file';

import { dirname, join } from 'node:path';
import { logger, setLogLevel } from '@flexydox/logger';
import { getConfig } from './config/app-config';
import { resolveRelativePathToCwd, setConfigDirectory } from './utils/resolve-relative-path';

program.name('flexydox').description('Flexydox CLI').version('0.0.1');

export async function cli(args: string[]) {
  program.hook('preAction', async () => {
    const configPathArg = program.opts()?.config;
    const verbose = program.opts()?.verbose;
    const veryVerbose = program.opts()?.veryVerbose;

    const configPath = configPathArg ? resolveRelativePathToCwd(configPathArg) : undefined;

    if (verbose) {
      setLogLevel('debug');
    }
    if (veryVerbose) {
      setLogLevel('trace');
    }

    if (configPath) {
      logger.info(`Using config file: ${configPath}`);
      const configDir = dirname(configPath);
      logger.info('Config directory:', configDir);
      setConfigDirectory(configDir);
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

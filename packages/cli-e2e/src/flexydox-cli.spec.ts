import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { describe, expect, it } from 'vitest';

export interface CLIOptions {
  command?: 'build' | '' | 'build-schema' | string;
  configFile?: string;
  fixtureFolder?: string;
}

export function runCLI(opts?: CLIOptions) {
  const command = opts?.command ?? 'build';
  const configFile = opts?.configFile ?? '';
  const fixtureFolder = opts?.fixtureFolder ?? 'chess-game';
  const fixtureFullPath = resolve(join(__dirname, '../../../fixtures', fixtureFolder));
  const configPath = configFile ? `--config ${resolve(join(fixtureFullPath, configFile))}` : '';
  const cmd = `flexydox ${command} ${configPath}`;
  console.log('\nRunning command:');
  console.log(cmd);
  console.log('\n');
  return execSync(cmd, { encoding: 'utf-8', cwd: fixtureFullPath }).toString();
}

describe('CLI tests', () => {
  describe('show usage when passing incorrect arguments', () => {
    it('should show usage when passing wrong command', () => {
      expect(() => {
        runCLI({ command: '' });
      }).toThrow('Usage: flexydox [options] [command]');
    });
  });
  describe('arguments errors', () => {
    it('should show missing config file message', () => {
      expect(() => {
        runCLI();
      }).toThrow('Config file not provided. Please provide a config file using --config option');
    });
  });
  describe('build command', () => {
    it('should work', () => {
      const result = runCLI({ configFile: 'flexydox.yaml' });

      expect(result).toContain('[build] Complete!');
    });
  });

  describe('set url path prefix', () => {
    it('should work', () => {
      const result = runCLI({
        configFile: 'flexydox.custom-path.yaml'
      });
      expect(result).toContain("Astro base path: '/custom-path-prefix'");
    });
  });

  describe('set custom site url', () => {
    it('should work', () => {
      const result = runCLI({
        configFile: 'flexydox.custom-site.yaml'
      });

      expect(result).toContain("Astro site url: 'https://examples.flexydox.com'");
    });
  });
});

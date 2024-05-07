import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { describe, expect, it } from 'vitest';

export function runCLI(command: 'build' | '', configFile = '', fixtureFolder = 'chess-game') {
  const fixtureFullPath = resolve(join(__dirname, '../../../fixtures', fixtureFolder));
  const configPath = configFile ? `--config ${resolve(join(fixtureFullPath, configFile))}` : '';
  const cmd = `flexydox ${command} ${configPath}`;
  return execSync(cmd, { encoding: 'utf-8', cwd: fixtureFullPath }).toString();
}

describe('CLI tests', () => {
  describe('show usage when passing incorrect arguments', () => {
    it('should show usage when passing wrong command', () => {
      expect(() => {
        runCLI('');
      }).toThrow('Usage: flexydox [options] [command]');
    });
  });
  describe('arguments errors', () => {
    it('should show missing config file message', () => {
      expect(() => {
        runCLI('build');
      }).toThrow('Config file not provided. Please provide a config file using --config option');
    });
  });
  describe('build command', () => {
    it('should work', () => {
      const result = runCLI('build', 'flexydox.yaml');

      expect(result).toContain('[build] Complete!');
    });
  });
});

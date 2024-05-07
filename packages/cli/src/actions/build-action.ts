import { Command } from 'commander';
import { fxdxBuild } from '../utils/fxdx-build';

export async function buildAction(_name: string, cmd: Command) {
  await fxdxBuild({
    generateDocFlag: true,
    previewServer: cmd.name() === 'preview'
  });
}

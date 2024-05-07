import { fxdxBuild } from '../utils/fxdx-build';

export async function buildSchemaAction() {
  await fxdxBuild({
    generateDocFlag: false,
    previewServer: false
  });
}

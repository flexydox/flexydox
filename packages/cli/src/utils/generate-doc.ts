import { join, resolve } from 'path';
import { URL } from 'url';
import { logger } from '@flexydox/logger';
import { getConfig } from '../config/app-config';

import { DocConfig, saveConfig } from '@flexydox/doc-schema';
import { AstroInlineConfig } from 'astro';
import { copyAsset, customAssetDir, getAssetsSrc } from './copy-asset';
import { resolveRelativePathToConfigFile, resolveRelativePathToCwd } from './resolve-relative-path';

export async function generateDoc(
  schemaPath: string,
  previewServer: boolean,
  generateDoc: boolean
) {
  const { build, preview } = await import('astro');
  const { default: icon } = await import('astro-icon');
  const appConfig = getConfig();

  if (!icon) {
    throw new Error('Icon integration not found');
  }

  const absoluteSchemaPath = resolveRelativePathToConfigFile(schemaPath);

  const outDir = resolveRelativePathToCwd(appConfig.outputFolder);

  const __dirname = new URL('.', import.meta.url).pathname;
  const rootDir = resolve(process.cwd());
  const astroRootDir = resolve(__dirname, '../../../../astro');
  const siteOutDir = join(outDir, 'site');
  const astroIconDir = resolve(astroRootDir, 'src/icons');
  const astroPublicDir = resolve(astroRootDir, 'public');
  const { site, base } = appConfig;

  const logo = appConfig?.logo;
  const logoUrl = resolveRelativePathToConfigFile(logo?.url);

  logger.info(`Root directory (cwd): '${rootDir}'`);
  logger.info(`Output directory: '${outDir}'`);
  logger.info(`Site Output directory: '${siteOutDir}'`);
  logger.info(`Astro root directory: '${astroRootDir}'`);
  logger.info(`Astro icons directory: '${astroIconDir}'`);

  const logoSrc = getAssetsSrc(logoUrl);
  if (logo?.url) {
    await copyAsset(logoUrl, astroPublicDir);

    logger.info(`Logo copied to '${customAssetDir(outDir)}' with src '${logoSrc}'`);
  } else {
    logger.info('Logo is not provided');
  }

  const logoData = logo?.url
    ? { url: logoSrc, alt: logo.alt, width: logo.width, height: logo.height }
    : undefined;

  const docConfig: DocConfig = {
    docSchemaFile: absoluteSchemaPath,
    logo: logoData,
    title: appConfig.title
  };

  const docConfigFile = await saveConfig(docConfig);

  process.env.FXDX_DOC_CONFIG_FILE = docConfigFile;
  logger.info(`Doc config saved to '${docConfigFile}'`);

  if (!generateDoc) {
    logger.info('Skipping documentation generation.');
    return;
  }

  logger.info(`Generating documentation from schema at '${schemaPath}'`);

  const cfg: AstroInlineConfig = {
    integrations: [
      icon({
        iconDir: astroIconDir
      })
    ],

    mode: 'production' as 'development' | 'production',
    root: astroRootDir,
    site,
    base,
    output: 'static' as 'static' | 'server',
    outDir: siteOutDir,
    vite: {
      optimizeDeps: {
        include: ['marked']
      }
    }
  };

  const cwdStored = process.cwd();
  logger.info('Setting cwd to Astro root directory', astroRootDir);
  process.chdir(astroRootDir);
  if (previewServer) {
    await preview(cfg);
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } else {
    await build(cfg);
  }
  process.chdir(cwdStored);
  logger.info(`Root directory (cwd): '${rootDir}'`);
  logger.info(`Output directory: '${outDir}'`);
  logger.info(`Site Output directory: '${siteOutDir}'`);
  logger.info(`Astro root directory: '${astroRootDir}'`);
  logger.info(`Astro icons directory: '${astroIconDir}'`);
  logger.info(`Astro site url: '${site ?? ''}'`);
  logger.info(`Astro base path: '${base ?? ''}'`);
}

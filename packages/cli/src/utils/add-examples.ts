import { DocSchema } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { loadExample } from './load-example.js';
import { loadSharedExampleConfig, resolveAllExampleFiles } from './resolve-files';

export async function addExamples(docSchema: DocSchema): Promise<void> {
  logger.info('Adding examples to operations');
  for (const ns of docSchema.namespaces) {
    const sharedConfig: { headers: Record<string, string> } = (await loadSharedExampleConfig(
      ns.id
    )) ?? { headers: {} };
    logger.info(`Loaded shared example config for ${ns.id} namespace`);
    logger.debug(sharedConfig);
    const exampleFiles = await resolveAllExampleFiles(ns.id, ns.spec);
    const examplePromises = exampleFiles.map(async (exampleFile) => {
      logger.debug(`Loading example from ${exampleFile}`);
      const example = await loadExample(ns, exampleFile);
      example.headers = { ...(sharedConfig?.headers ?? {}), ...example.headers };
      logger.info(`Mapping example from ${exampleFile} to operation ${example.operationId}`);
      const op = docSchema.operations.find((o) => o.id === example.operationId);
      if (!op) {
        logger.warn(`Operation ${example.operationId} not found`);
      }
      if (op) {
        op.examples = op.examples ?? [];
        op.examples.push(example);
      }
    });
    await Promise.all(examplePromises);
  }
}

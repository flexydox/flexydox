// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { DocOperation, DocSchema, DocType, Namespace } from '@flexydox/doc-schema';
declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace App {
    interface Locals {
      doc: DocSchema;
      types: DocType[];
      operations: DocOperation[];
      namespaces: Namespace[];
      nextId: number;
    }
  }
}

import { OperationKind } from '@flexydox/doc-schema';
import { Color } from '../types';

export interface OperationKindData {
  color: Color;
}

export function getOperationKindData(kind: OperationKind): OperationKindData {
  return { color: `--c-op-kind-${kind}` };
}

import { OperationReturnStatus } from '@flexydox/doc-schema';

/**
 * Maps a response status to an OperationReturnStatus
 * @param responseStatus The response status
 * @returns The OperationReturnStatus
 */
export function operationReturnStatusMapper(
  responseStatus: string | null | undefined
): OperationReturnStatus {
  const status = parseInt(responseStatus ?? '0', 10);
  if (status >= 200 && status < 400) {
    return 'success';
  } else if (status > 400) {
    return 'error';
  }
  return 'unknown';
}

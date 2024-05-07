export function markDeprecated(deprecated: string | boolean | undefined | null) {
  if (!!deprecated) {
    return 'fxdx-deprecated';
  }
  return '';
}

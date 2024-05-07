import { DocType, DocTypeLink } from '@flexydox/doc-schema';

export function typeLinkFromType(type: DocType | null | undefined): DocTypeLink | null {
  if (!type) {
    return null;
  }
  return {
    title: type.name,
    href: type.id,
    description: type.description
  };
}

import { DocTypeLink, DocTypeRef, TypeRefCollectionType } from '@flexydox/doc-schema';

type TypeLinkWithId = DocTypeLink & { typeId: string };
type TypeLinkMap = Record<TypeRefCollectionType, TypeLinkWithId[]>;

/**
 * Get the types recursively
 * @param typeRef DocTypeRef
 * @returns DocTypeLink[]
 **/
function addTypeLinks(linkMap: TypeLinkMap, typeRef: DocTypeRef | undefined | null): void {
  if (!typeRef) {
    return;
  }
  if (typeRef.link) {
    const collType = typeRef.collectionType;
    const link = { ...typeRef.link, typeId: typeRef.typeId };
    linkMap[collType].push(link);
  }
  if (typeRef.ofType) {
    addTypeLinks(linkMap, typeRef.ofType);
  }
}

export function typeRefToTypeLinkMap(typeRef: DocTypeRef): TypeLinkMap {
  const linkMap: TypeLinkMap = {
    none: [],
    list: [],
    array: []
  };
  addTypeLinks(linkMap, typeRef);
  return linkMap;
}

export function getDefaultTypeId(typeRef: DocTypeRef): string | null {
  const typeLinkMap = typeRefToTypeLinkMap(typeRef);
  return typeLinkMap.none.length > 0 ? typeLinkMap.none[0].typeId : null;
}

import { DocType, DocTypeKind } from '@flexydox/doc-schema';
import { getTypeId } from '../../utils/get-type-id';
import { MapperContext } from '../mapper-context';

interface BasicType {
  name: string;
  kind: DocTypeKind;
  description: string;
}

const basicTypes: BasicType[] = [
  { name: 'string', kind: 'scalar', description: 'The OpenAPI string type' },
  { name: 'number', kind: 'scalar', description: 'The OpenAPI number type' },
  { name: 'integer', kind: 'scalar', description: 'The OpenAPI integer type' },
  { name: 'boolean', kind: 'scalar', description: 'The OpenAPI boolean type' },
  { name: 'array', kind: 'list', description: 'The OpenAPI array type' }
];

export function getBasicTypes(ctx: MapperContext): DocType[] {
  return basicTypes.map((basicType) => {
    return {
      id: getTypeId(ctx.namespace, basicType.name),
      name: basicType.name,
      groups: [],
      kind: basicType.kind,
      description: basicType.description,
      namespaceId: ctx.namespace.id
    } as DocType;
  });
}

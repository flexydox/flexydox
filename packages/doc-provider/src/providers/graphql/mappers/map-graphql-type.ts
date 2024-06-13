import { DocType, EnumValue, GroupDefinition, Namespace } from '@flexydox/doc-schema';
import { GraphQLEnumType, GraphQLNamedType } from 'graphql';
import { addMatchedGroups } from '../../../utils/add-matched-groups';
import { getTypeId } from '../../../utils/get-type-id';
import { MapperContext } from '../../mapper-context';
import { GraphQLTypeMap } from './graphql-type-map';

export function mapGraphQLType(ctx: MapperContext, t: GraphQLNamedType): DocType {
  const { namespace } = ctx;
  const dt: DocType = {
    id: getTypeId(namespace, t.name),
    name: t.name,
    namespaceId: namespace.id,
    description: t.description,
    kind: GraphQLTypeMap[t.constructor.name],
    groups: []
  };
  dt.groups = addMatchedGroups(ctx, dt.name, `type ${dt.name}`);

  // add enum values
  if (t instanceof GraphQLEnumType) {
    dt.values = t.getValues().map((v) => {
      const dv: EnumValue = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: v.value,
        description: v.description,
        deprecationReason: v.deprecationReason
      };
      return dv;
    });
  }

  return dt;
}

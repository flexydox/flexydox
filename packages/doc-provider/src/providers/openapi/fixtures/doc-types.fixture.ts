import { DocType } from '@flexydox/doc-schema';
import { MapperContext } from '../../mapper-context';

function serverError(ctx: MapperContext): DocType {
  return {
    id: 'openapi3.components-schemas-ServerError',
    name: 'ServerError',
    description: 'Error',
    kind: 'OBJECT',
    namespaceId: ctx.namespace.id,
    groups: [],
    fields: [
      {
        name: 'status',
        typeRef: {
          typeId: 'openapi3.integer',
          collectionType: 'none',
          namespaceId: ctx.namespace.id,
          required: false,
          link: {
            title: 'string',
            href: 'openapi3.integer',
            description: 'integer'
          }
        }
      },

      {
        name: 'detail',
        typeRef: {
          typeId: 'openapi3.string',
          collectionType: 'none',
          namespaceId: ctx.namespace.id,
          required: false,
          link: {
            title: 'string',
            href: 'openapi3.string',
            description: 'string'
          }
        }
      }
    ]
  };
}

function player(ctx: MapperContext): DocType {
  return {
    id: 'openapi3.components-schemas-Player',
    name: 'Player',
    kind: 'OBJECT',
    namespaceId: ctx.namespace.id,
    groups: [],
    fields: [
      {
        name: 'id',
        typeRef: {
          typeId: 'openapi3.string',
          collectionType: 'none',
          namespaceId: ctx.namespace.id,
          required: true,
          link: {
            title: 'string',
            href: 'openapi3.string',
            description: 'string'
          }
        }
      },
      {
        name: 'name',
        typeRef: {
          typeId: 'openapi3.string',
          collectionType: 'none',
          namespaceId: ctx.namespace.id,
          required: true,
          link: {
            title: 'string',
            href: 'openapi3.string',
            description: 'string'
          }
        }
      }
    ]
  };
}

function playersResponse(ctx: MapperContext): DocType {
  return {
    id: 'openapi3.components-schemas-PlayerResponse',
    name: 'PlayerResponse',
    description: 'PlayerResponse',
    kind: 'OBJECT',
    namespaceId: ctx.namespace.id,
    groups: [],

    fields: [
      {
        name: 'items',
        typeRef: {
          typeId: 'openapi3.array',
          namespaceId: ctx.namespace.id,
          required: true,
          collectionType: 'array',
          link: {
            title: '[]',
            href: 'openapi3.array',
            description: 'Array'
          },
          ofType: {
            namespaceId: ctx.namespace.id,
            required: true,
            collectionType: 'none',
            typeId: 'openapi3.components-schemas-Player',
            link: {
              title: 'Player',
              href: 'openapi3.components-schemas-Player',
              description: 'Player'
            }
          }
        }
      }
    ]
  };
}

const docTypes: Record<string, (ctx: MapperContext) => DocType> = {
  'openapi3.components-schemas-ServerError': serverError,
  'openapi3.components-schemas-Player': player,
  'openapi3.components-schemas-PlayersResponse': playersResponse
};

export function setDocType(ctx: MapperContext, key: keyof typeof docTypes): void {
  const fn = docTypes[key];
  if (!fn) {
    throw new Error(`Unknown doc type: ${key}`);
  }
  ctx.types.set(key, docTypes[key](ctx));
}

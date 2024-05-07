import { OperationType } from '@flexydox/doc-schema';

export interface OperationTypeData {
  name: string;
  title: string;
  apiType: string;
}

const opTypeMap: Record<OperationType, OperationTypeData> = {
  query: {
    name: 'query',
    title: 'GraphQL Query',
    apiType: 'graphql'
  },
  mutation: {
    name: 'mutation',
    title: 'GraphQL Mutation',
    apiType: 'graphql'
  },
  subscription: {
    name: 'subscription',
    title: 'GraphQL Subscription',
    apiType: 'graphql'
  },
  get: {
    name: 'GET',
    title: 'HTTP GET',
    apiType: 'openapi'
  },
  post: {
    name: 'POST',
    title: 'HTTP POST',
    apiType: 'openapi'
  },
  put: {
    name: 'PUT',
    title: 'HTTP PUT',
    apiType: 'openapi'
  },
  patch: {
    name: 'PATCH',
    title: 'HTTP PATCH',
    apiType: 'openapi'
  },
  delete: {
    name: 'DELETE',
    title: 'HTTP DELETE',
    apiType: 'openapi'
  },
  head: {
    name: 'HEAD',
    title: 'HTTP HEAD',
    apiType: 'openapi'
  },
  options: {
    name: 'OPTIONS',
    title: 'HTTP OPTIONS',
    apiType: 'openapi'
  },
  trace: {
    name: 'TRACE',
    title: 'HTTP TRACE',
    apiType: 'openapi'
  }
};

export function getOperationTypeData(operationType: OperationType): OperationTypeData {
  return opTypeMap[operationType];
}

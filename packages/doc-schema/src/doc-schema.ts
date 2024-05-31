/** Utility type */
type Maybe<T> = T | null | undefined;

/**
 * Possible types of operations.
 **/
export type OperationType =
  | 'query'
  | 'mutation'
  | 'subscription'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type OperationKind = 'read' | 'modify' | 'subscribe' | 'other';

export type OperationReturnStatus = 'success' | 'error' | 'unknown';

/**
 * Source API specifications supported by FlexyDox
 **/
export type SourceSpec = 'graphql' | 'openapi3.0';

/**
 * Possible kinds of the type.
 **/
export type DocTypeKind = 'scalar' | 'object' | 'interface' | 'union' | 'enum' | 'input' | 'list';

/**
 * A namespace is a collection of types and operations.
 * It is a source of the API specifications, such as a GraphQL schema or an OpenAPI specification.
 */
export interface Namespace {
  /** unique namespace id */
  id: string;
  /** namespace name */
  name: string;
  /** namespace source */
  spec: SourceSpec;
  /** source from which API spec was obtained */
  source: string;
}

/**
 * A link (url and title) to a type definition.
 * Used to link to the type definition from the documentation.
 */
export interface DocTypeLink {
  /** link title */
  title: string;
  /** link url */
  href?: Maybe<string>;
  /**
   * link description
   */
  description?: Maybe<string>;
}

export type TypeRefCollectionType = 'array' | 'list' | 'none';

/**
 * Reference to a type.
 * Recurrent structure to support nested types.
 * For example, a field of type `List` of `User` would be represented as:
 * ```
 * {
 *   type: 'List',
 *   typeOf: {
 *     type: 'User'
 *   }
 * }
 * or User array:
 * {
 *   type: 'Array',
 *   typeOf: {
 *     type: 'User'
 *   }
 * }
 * ```
 */

export interface DocTypeRef {
  /**
   * Unique type reference.
   * For example `User`.
   * Can be undefined if the type is an array.
   */
  typeId: string;

  /**
   * Collection type of the type ref.
   * Helps with rendering the type reference in the documentation.
   */
  collectionType: TypeRefCollectionType;

  /**
   * Namespace id of the type.
   */
  namespaceId: string;
  /**
   * Type of the type.
   * For example `List`.
   * Can be undefined if the type is not an array.
   */
  ofType?: Maybe<DocTypeRef>;
  /**
   * True if the type is required.
   */
  required: boolean;

  /**
   * Link to the type definition.
   * Used to link to the type definition from the documentation.
   */
  link: DocTypeLink;
}

/**
 * An argument of an operation.
 */
export interface OperationArgument {
  /** argument name */
  name: string;
  /** argument description */
  description?: Maybe<string>;
  /** argument type reference */
  /** operation argument deprecation reason */
  deprecationReason?: Maybe<string>;
  /** argument type reference */
  typeRef: DocTypeRef;
}

/**
 * Return type of an operation.
 */
export interface OperationReturn {
  /** operation return type reference */
  typeRef: DocTypeRef;
  /** operation return deprecation reason */
  deprecationReason?: Maybe<string>;
  /** operation return status code */
  statusCode?: Maybe<string>;
  /** operation return status */
  status: OperationReturnStatus;
  /** operation return media type */
  mediaType?: string;
}

/**
 * An operation is a function that can be executed.
 * It can be a query, mutation, or subscription in GraphQL, or a GET, POST, PUT, PATCH, or DELETE in OpenAPI.
 */
export interface DocOperation {
  /** unique operation id */
  id: string;
  /** reference to namespace */
  namespaceId: string;
  /** operation type */
  operationType: OperationType;
  /**
   * operation kind
   */
  operationKind: OperationKind;
  /** operation name */
  name: string;
  /** operation description */
  description?: Maybe<string>;
  /** operation arguments */
  arguments: OperationArgument[];
  /** possible operation returns */
  returns: OperationReturn[];
  /** operation deprecation reason */
  deprecationReason?: Maybe<string>;
  /** FlexyDox groups */
  groups: string[];
  /** operation examples */
  examples: OperationExample[];
}

/**
 * A field of an object type.
 */
export interface DocTypeField {
  /** field name */
  name: string;
  /** field description */
  description?: Maybe<string>;
  /** field deprecation reason */
  deprecationReason?: Maybe<string>;
  /** Field arguments */
  arguments?: Maybe<OperationArgument[]>;
  /** field type reference */
  typeRef: DocTypeRef;
}

/**
 * A value of an enum type.
 */
export interface EnumValue {
  /** enum value */
  value: string | number;
  /** enum value description */
  description?: Maybe<string>;
  /** enum value deprecation reason */
  deprecationReason?: Maybe<string>;
}

/**
 * A type is a definition of a data structure.
 */
export interface DocType {
  /** unique type id */
  id: string;
  /** type name */
  name: string;
  /** type deprecation reason */
  deprecationReason?: Maybe<string>;
  /** namespace id */
  namespaceId: string;
  /** type description */
  description?: Maybe<string>;
  /** type kind */
  kind: DocTypeKind;
  /** List of fields for object types. */
  fields?: Maybe<DocTypeField[]>;
  /** Possible values for enum types. */
  values?: Maybe<EnumValue[]>;
  /** List of interfaces implemented by this type. */
  interfaces?: Maybe<string[]>;
  /** List of types that are the union of this type. */
  unionTypes?: Maybe<string[]>;
  /** FlexyDox groups */
  groups: string[];
}

/**
 * Custom page configuration
 * Represents a markdown file that will be rendered as a page
 */
export interface CustomPageData {
  /**
   * Page slug
   * It will be used to generate a page url
   * and as the sort key to order page links in the menu
   **/
  slug?: string;
  /**
   * markdown page content
   **/
  content: string;
  /** Page title */
  title: string;

  /**
   * Path defines position in the main navigation
   * Slash delimited path:
   * /{rootSlug}/{parentSlug}
   * If not defined, page will be shown in the root
   *
   */
  path?: string;
}
export type ExampleCodeLang = 'plaintext' | 'graphql' | 'http';
export interface OperationExample {
  /**
   * operationId of the example
   */
  operationId: string;
  /**
   * Example request body
   **/
  code: string;

  lang: ExampleCodeLang;
  /**
   * Example title
   */
  title: string;
  /**
   * Example description
   */
  description?: string;

  /**
   * Example headers
   */
  headers?: Record<string, string>;

  /**
   * Example query parameters
   **/
  query?: Record<string, string>;

  /**
   * Example request path
   **/
  path?: string;
}

/**
 * The normalized documentation schema.
 * Root object of the schema.
 */
export interface DocSchema {
  /** All namespaces */
  namespaces: Namespace[];
  /** All operations */
  operations: DocOperation[];
  /** All types */
  types: DocType[];
  /** All groups */
  groups: GroupDefinition[];

  /**
   * Custom pages configuration
   **/
  customPages: CustomPageData[];
}

/**
 * Helper interface used to define groups and add types and operations
 * to them while processing api specs.
 * Groups can be thought of as tags, categories or domains
 * and they can help to organize types and operations.
 */
export interface GroupDefinition {
  id: string;
  name: string;
  /**
   * Regular expression used to match type or operation name or description.
   * Types and operations are added to groups if their name or description matches provided regex.
   */
  regex?: RegExp;
}

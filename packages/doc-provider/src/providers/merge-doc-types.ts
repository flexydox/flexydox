import type { DocType, DocTypeField } from '@flexydox/doc-schema';

/**
 * Merges multiple DocTypes into a single DocType
 * merges the fields of the DocTypes
 * @param docTypes The DocTypes to merge
 * @returns The merged DocType
 */
export function mergeDocTypesFields(docTypes: DocType[]): DocType | null {
  if (docTypes.length === 0) {
    return null;
  }
  if (docTypes.length === 1) {
    return docTypes[0];
  }
  return docTypes.reduce((acc, docType) => {
    if (!acc) {
      return docType;
    }
    for (const field of docType.fields ?? []) {
      addUniqueField(acc.fields ?? [], field);
    }
    return acc;
  });
}

/**
 * Adds a field to the fields array if it does not exist
 * compares the field name
 * @param fields The fields array
 * @param field The field to add
 * @returns The fields array
 **/
function addUniqueField(fields: DocTypeField[], field: DocTypeField): DocTypeField[] {
  if (!fields.find((f) => f.name === field.name)) {
    fields.push(field);
  }
  return fields;
}

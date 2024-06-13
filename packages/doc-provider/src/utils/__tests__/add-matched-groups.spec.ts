import { describe, expect, it } from 'vitest';
import { addMatchedGroups } from '../add-matched-groups';
import { MapperContext } from '../../providers/mapper-context';
import { GroupDefinition } from '@flexydox/doc-schema';

const buildCtx = (groups: GroupDefinition[]): MapperContext => {
  return {
    types: new Map(),
    namespace: { id: 'test', inferGroups: true, name: 'test', source: 'test', spec: 'openapi3.0' },
    groups: new Map(groups.map((g) => [g.id, g]))
  };
};

describe('addMatchedGroups', () => {
  it('should return empty array if no groups match', () => {
    const groups = [{ id: 'issues', name: 'issues', regex: /issues/i }];
    const ctx = buildCtx(groups);
    const result = addMatchedGroups(ctx, 'users', 'test');
    expect(result).toEqual([]);
  });
  it('should return matched group id', () => {
    const groups = [{ id: 'issues', name: 'issues', regex: /issues/i }];
    const ctx = buildCtx(groups);
    const result = addMatchedGroups(ctx, 'issues', 'test');
    expect(result).toEqual(['issues']);
  });
  it('should return multiple matched group ids', () => {
    const groups = [
      { id: 'issues', name: 'issues', regex: /issues/i },
      { id: 'users', name: 'users', regex: /user/i }
    ];
    const ctx = buildCtx(groups);
    const result = addMatchedGroups(ctx, 'issues and users', 'test');
    expect(result).toEqual(['issues', 'users']);
  });
  it('should return empty array if no groups provided', () => {
    const ctx = buildCtx([]);
    const result = addMatchedGroups(ctx, 'issues and users', 'test');
    expect(result).toEqual([]);
  });
});

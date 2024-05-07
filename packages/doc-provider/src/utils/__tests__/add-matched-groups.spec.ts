import { describe, expect, it } from 'vitest';
import { addMatchedGroups } from '../add-matched-groups';

describe('addMatchedGroups', () => {
  it('should return empty array if no groups match', () => {
    const groups = [{ id: 'issues', name: 'issues', regex: /issues/i }];
    const result = addMatchedGroups(groups, 'users', 'test');
    expect(result).toEqual([]);
  });
  it('should return matched group id', () => {
    const groups = [{ id: 'issues', name: 'issues', regex: /issues/i }];
    const result = addMatchedGroups(groups, 'issues', 'test');
    expect(result).toEqual(['issues']);
  });
  it('should return multiple matched group ids', () => {
    const groups = [
      { id: 'issues', name: 'issues', regex: /issues/i },
      { id: 'users', name: 'users', regex: /user/i }
    ];
    const result = addMatchedGroups(groups, 'issues and users', 'test');
    expect(result).toEqual(['issues', 'users']);
  });
  it('should return empty array if no groups provided', () => {
    const result = addMatchedGroups([], 'issues and users', 'test');
    expect(result).toEqual([]);
  });
});

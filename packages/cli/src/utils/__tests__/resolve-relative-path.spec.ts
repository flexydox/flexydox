import { describe, expect, it } from 'vitest';
import { isRelativePath } from '../resolve-relative-path';

describe('resolve-relative-path', () => {
  describe('isRelativePath', () => {
    it('should return true if empty', () => {
      expect(isRelativePath('')).toBe(true);
    });

    it('should return true if null', () => {
      expect(isRelativePath(null)).toBe(true);
    });

    it('should return true if undefined', () => {
      expect(isRelativePath(undefined)).toBe(true);
    });
    it('should return true if does not start with slash', () => {
      expect(isRelativePath('./docs')).toBe(true);
    });

    it('should return false if starts with slash', () => {
      expect(isRelativePath('/')).toBe(false);
    });

    it('should return false if starts with http protocol', () => {
      expect(isRelativePath('http://')).toBe(false);
    });
    it('should return false if starts with https protocol', () => {
      expect(isRelativePath('https://')).toBe(false);
    });
  });
});

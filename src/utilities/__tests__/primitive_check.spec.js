import { describe, expect, it } from 'vitest';

import { primitiveCheck, PrimitiveAssertionFailed } from '../primitiveCheck.js';

describe('primitiveCheck', () => {
  describe('when the value being asserted matches the primitive expected', () => {
    it('returns null', async () => {
      expect(primitiveCheck('Bob Saget', 'string')).toBeNull();
    });
  });

  describe('when the value being asserted does NOT match the primitive expected', () => {
    it('throws a PrimitiveAssertionFailed error', () => {
      try {
        primitiveCheck('Bob Saget', 'number')
      } catch (error) {
        expect(error).toBeInstanceOf(PrimitiveAssertionFailed);
        expect(error.message).toContain('Bob Saget');
        expect(error.message).toContain('string');
        expect(error.message).toContain('number');
        expect(error.message).toContain('NOT');
      }
    });
  });
});


import { describe, expect, it } from 'vitest';

import { getCallSite } from '../getCallSite.js';
import { callSiteTestFn } from './test_utilities/callSiteTestFn.js';

describe('getCallSite', () => {
  describe('when the call site is a valid response', () => {
    it('returns the file, row and column of the function that in the call stack', () => {
      const caller = callSiteTestFn(); // NOTE: any time we relocate this caller, we need to modify the expected row two lines down.
      expect(caller.file).toContain('callSiteTestFn.js');
      expect(caller.row).toBe('4');
      expect(caller.column).toBe('21');
    });
  });

  describe('when the stack is null', () => {
    it('returns the the unknown call stack response', () => {
      const OriginalError = globalThis.Error;
      const CurrentError = globalThis.Error;

      class OverrideError extends CurrentError {
        constructor(message) {
          super(message);

          Object.defineProperty(this, 'stack', {
            get() {
              return null;
            },
            configurable: true,
          });
        }
      }

      globalThis.Error = OverrideError;

      const caller = callSiteTestFn();
      expect(caller.file).toBe('Unknown call stack');
      expect(caller.row).toBe('0');
      expect(caller.column).toBe('0');

      globalThis.Error = OriginalError;
    });
  });

  describe('when the stack trace is less than the depth requested + 1', () => {
    it('returns the the unknown call stack response', () => {
      const OriginalError = globalThis.Error;
      const CurrentError = globalThis.Error

      class OverrideError extends CurrentError {
        constructor(message) {
          super(message);

          Object.defineProperty(this, 'stack', {
            get() {
              return 'https://example.com/test.js';
            },
            configurable: true,
          });
        }
      }

      globalThis.Error = OverrideError;

      const caller = callSiteTestFn();
      expect(caller.file).toBe('Unknown call stack');
      expect(caller.row).toBe('0');
      expect(caller.column).toBe('0');

      globalThis.Error = OriginalError;
    });
  });

  describe('when the target line is null/undefined', () => {
    it('returns the the unknown call stack response', () => {
      const OriginalError = globalThis.Error;
      const CurrentError = globalThis.Error

      class OverrideError extends CurrentError {
        constructor(message) {
          super(message);

          Object.defineProperty(this, 'stack', {
            get() {
              return `Error line 1\nError line 2\nError line 3`;
            },
            configurable: true,
          });
        }
      }

      globalThis.Error = OverrideError;

      const caller = callSiteTestFn();
      expect(caller.file).toBe('Unknown call stack');
      expect(caller.row).toBe('0');
      expect(caller.column).toBe('0');

      globalThis.Error = OriginalError;
    });
  });

  describe('when the match is null/undefined', () => {
    it('returns the the unknown call stack response', () => {
      const OriginalError = globalThis.Error;
      const CurrentError = globalThis.Error

      class OverrideError extends CurrentError {
        constructor(message) {
          super(message);

          Object.defineProperty(this, 'stack', {
            get() {
              return 'https://example.com/test1.js\nhttps://example.com/test2.js\nhttps://example.com/test3.js\n';
            },
            configurable: true,
          });
        }
      }

      globalThis.Error = OverrideError;

      const caller = callSiteTestFn();
      expect(caller.file).toBe('Unknown call stack');
      expect(caller.row).toBe('0');
      expect(caller.column).toBe('0');

      globalThis.Error = OriginalError;
    });
  });
});


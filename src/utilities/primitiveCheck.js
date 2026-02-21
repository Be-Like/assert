import { getCallSite } from './getCallSite.js';

export class PrimitiveAssertionFailed extends Error { }

/**
 * @description
 * Checks whether the value being passed in is a primitive data type.
 *
 * @param {any} val The value being evaluated as a primitive.
 * @param {'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'null'} primitive 
 * The expected primitive data type.
 *
 * @returns {null}
 *
 * @throws {PrimitiveAssertionFailed} If the value does not match the primitive it is expected to be.
 *
 * @example
 * ```
 * primitiveCheck(23, 'number'); // returns null
 * ```
 *
 * ```
 * primitiveCheck(23, 'string'); // throws PrimitveAssertionError(...)
 * ```
 */
export function primitiveCheck(val, primitive) {
  if (typeof val === primitive) {
    return null;
  } else {
    const caller = getCallSite(2);
    throw new PrimitiveAssertionFailed(
      `${caller.file}:${caller.row}:${caller.column} asserted value '${val}' (type ${typeof val}) was found NOT to be of type '${primitive}'`
    );
  }
}


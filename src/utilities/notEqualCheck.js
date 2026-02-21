import { getCallSite } from './getCallSite.js';

export class NotEqualAssertionFailed extends Error {}

/**
 * @description
 * Checks that the value provided is *not* equal to the value it is being compared against.
 *
 * @param {any} val Value being asserted as equaling the compared value.
 * @param {any} comparedValue The comparison the value is being asserted against.
 * @returns {null}
 *
 * @throws {NotEqualAssertionFailed} If the equality comparison fails to equate to true.
 */
const notEqualCheck = (val, comparedValue) => {
  if (val !== comparedValue) return null;

  const caller = getCallSite(2);
  throw new NotEqualAssertionFailed(
    `${caller.file}:${caller.row}:${caller.column} asserted value '${val}' to NOT equal '${comparedValue}'`
  );
};


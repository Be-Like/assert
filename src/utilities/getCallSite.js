/**
 * @description
 * An object that provides details for the file and location of a specific call.
 *
 * @typedef Diagnostics.CallSite
 * @property {string} file The call site file name.
 * @property {string} row The call site row location.
 * @property {string} column The call site column location.
 */

/**
 * @type {Diagnostics.CallSite}
 */
const UNKNOWN_CALL_STACK = { file: 'Unknown call stack', row: '0', column: '0' };

/**
 * @description
 * Gets the call site details based on the call stack.
 *
 * This is done by creating an Error and grabbing the resulting stack. And then we use regexes to split the resulting
 * stack and grab the necessary information for building the call site diagnostic details.
 *
 * @param {number} depth Specifies which call site should be returned within the call stack.
 * @returns {Diagnostics.CallSite}
 */
export function getCallSite(depth) {
  const callStack = new Error().stack;
  if (callStack == null) return UNKNOWN_CALL_STACK;

  const stack = callStack.split('\n');
  if (stack.length <= depth + 1) return UNKNOWN_CALL_STACK;

  // Match lines that look like they contain a source location
  const callStackLineRegex = /(?:https?|file|webpack|vite|ng|blob|node):\/\/|\//u;
  const callStackLines = stack.filter((line) => callStackLineRegex.test(line));

  const targetLine = callStackLines[depth + 1];
  if (targetLine == null) return UNKNOWN_CALL_STACK;

  const matchRegex = /((?:https?|file|webpack|vite|ng|blob|node):\/\/.+|\S+):(\d+):(\d+)/u;
  const match = targetLine.match(matchRegex);
  if (match == null) return UNKNOWN_CALL_STACK;

  return {
    file: match[1],
    row: match[2],
    column: match[3]
  };
}


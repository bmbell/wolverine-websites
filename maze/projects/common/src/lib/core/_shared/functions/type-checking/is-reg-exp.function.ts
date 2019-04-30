/**
 * Determines if the reference is a regular expression
 * @param value - The reference to check
 * @returns True if the reference is a regular expression; otherwise false
 */
export function isRegExp(value: any): boolean {
    return Object.prototype.toString.call(value) === "[object RegExp]";
}

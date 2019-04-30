/**
 * Determines if the reference is a file reference
 * @param value - The reference to check
 * @returns True if the reference is a file reference; otherwise false
 */
export function isFile(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object File]";
}

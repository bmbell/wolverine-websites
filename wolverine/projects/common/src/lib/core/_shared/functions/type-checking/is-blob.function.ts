/**
 * Determines if the reference is a blob
 * @param value - The reference to check
 * @returns True if the reference is a blob; otherwise false
 */
export function isBlob(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Blob]";
}

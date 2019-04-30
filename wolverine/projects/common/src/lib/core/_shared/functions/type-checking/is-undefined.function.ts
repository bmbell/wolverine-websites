/**
 * Determines if the reference is undefined
 * @param value - The reference to check
 * @returns True if the reference is undefined; otherwise false
 */
export function isUndefined(value: any): boolean {
    return typeof value === "undefined";
}

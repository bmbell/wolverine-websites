/**
 * Determines if the reference is an object
 * @param value - The reference to check
 * @returns True if the reference is an object; otherwise false
 */
export function isObject(value: any): boolean {
    return value !== null && typeof value === "object";
}

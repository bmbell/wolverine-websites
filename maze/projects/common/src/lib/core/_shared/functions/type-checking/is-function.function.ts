/**
 * Determines if the reference is a function
 * @param value - The reference to check
 * @returns True if the reference is a function; otherwise false
 */
export function isFunction(value: any): boolean {
    return typeof value === "function";
}

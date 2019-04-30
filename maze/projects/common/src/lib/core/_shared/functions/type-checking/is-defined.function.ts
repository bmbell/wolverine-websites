/**
 * Determines if the reference is defined
 * @param value - The reference to check
 * @returns True if the reference is defined; otherwise false
 */
export function isDefined(value: any): boolean {
    return typeof value !== "undefined";
}

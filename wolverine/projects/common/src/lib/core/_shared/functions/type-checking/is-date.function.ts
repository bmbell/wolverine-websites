/**
 * Determines if the reference is a date
 * @param value - The reference to check
 * @returns True if the reference is a date; otherwise false
 */
export function isDate(value: any): boolean {
    return (value instanceof Date);
}

import { Observable } from "rxjs";

/**
 * Determines if the reference is an observable
 * @param value - The reference to check
 * @returns True if the reference is an observable; otherwise false
 */
export function isObservable(value: any): boolean {
    return (value instanceof Observable);
}

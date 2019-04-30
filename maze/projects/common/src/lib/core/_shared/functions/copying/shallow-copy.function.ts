import { isObject } from "../type-checking/is-object.function";
import { isUndefined } from "../type-checking/is-undefined.function";
import { isArray } from "../type-checking/is-array.function";

/**
 * Makes a shallow copy of the object or array (convenience method)
 * @param value The value to copy
 */
export function shallowCopy<T>(value: T): T {

  if (!isObject(value) || isUndefined(value)) {
    return value;
  }

  return Object.assign(isArray(value) ? [] : {}, value);
}

import { isObject } from "../type-checking/is-object.function";
import { isUndefined } from "../type-checking/is-undefined.function";
import { isArray } from "../type-checking/is-array.function";

/**
 * Makes a deep copy of the object or array (Note: cannot handle circular references!)
 * @param value The value to copy
 */
export function deepCopy<T>(value: T): T {

  if (!isObject(value) || isUndefined(value)) {
    return value;
  }

  if (isArray(value)) {

    const newArray: any = [];
    const arrayLength = (value as any).length;

    for (let i = 0; i < arrayLength; i++) {
      newArray[i] = deepCopy(value[i]);
    }

    return newArray;
  }
  else {

    const newObject: any = {};
    for (const i in value) {

      if (value.hasOwnProperty(i)) {
        newObject[i] = deepCopy(value[i]);
      }
    }

    return newObject;
  }
}

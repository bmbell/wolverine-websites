import { isArray } from "./is-array.function";
import { isBlob } from "./is-blob.function";
import { isBoolean } from "./is-boolean.function";
import { isDate } from "./is-date.function";
import { isDefined } from "./is-defined.function";
import { isFile } from "./is-file.function";
import { isFunction } from "./is-function.function";
import { isNumber } from "./is-number.function";
import { isObject } from "./is-object.function";
import { Observable } from "rxjs";
import { isObservable } from "./is-observable.function";
import { isRegExp } from "./is-reg-exp.function";
import { isString } from "./is-string.function";
import { isUndefined } from "./is-undefined.function";

describe("Type-Checking Functions", () => {

  describe("isArray", () => {

    it("should determine if the object is an array", () => {

      expect(isArray(undefined)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray({})).toBe(false);
      expect(isArray([])).toBe(true);
    });
  });

  describe("isBlob", () => {

    it("should determine if the object is a blob", () => {

      expect(isBlob(undefined)).toBe(false);
      expect(isBlob(null)).toBe(false);
      expect(isBlob({})).toBe(false);
      expect(isBlob([])).toBe(false);
      expect(isBlob(new Blob())).toBe(true);
    });
  });

  describe("isBoolean", () => {

    it("should determine if the object is a boolean value", () => {

      expect(isBoolean(undefined)).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean({})).toBe(false);
      expect(isBoolean([])).toBe(false);
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });
  });

  describe("isDate", () => {

    it("should determine if the object is a date", () => {

      expect(isDate(undefined)).toBe(false);
      expect(isDate(null)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
      expect(isDate(new Date())).toBe(true);
    });
  });

  describe("isDefined", () => {

    it("should determine if the object is defined", () => {

      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(null)).toBe(true);
      expect(isDefined({})).toBe(true);
      expect(isDefined([])).toBe(true);
    });
  });

  describe("isFile", () => {

    it("should determine if the object is a file object", () => {

      expect(isFile(undefined)).toBe(false);
      expect(isFile(null)).toBe(false);
      expect(isFile({})).toBe(false);
      expect(isFile([])).toBe(false);
      expect(isFile(new File([], "some-file.png"))).toBe(true);
    });
  });

  describe("isFunction", () => {

    it("should determine if the value is a function", () => {

      expect(isFunction(undefined)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction((something: boolean) => something ? 1 : 0)).toBe(true);
    });
  });

  describe("isNumber", () => {

    it("should determine if the value is a number", () => {

      expect(isNumber(undefined)).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber(1)).toBe(true);
    });
  });

  describe("isObject", () => {

    it("should determine if the value is an object", () => {

      expect(isObject(undefined)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject([])).toBe(true);
      expect(isObject({})).toBe(true);
    });
  });

  describe("isObservable", () => {

    it("should determine if the object is an observable", () => {

      expect(isObservable(undefined)).toBe(false);
      expect(isObservable(null)).toBe(false);
      expect(isObservable({})).toBe(false);
      expect(isObservable([])).toBe(false);
      expect(isObservable(new Observable())).toBe(true);
    });
  });

  describe("isRegExp", () => {

    it("should determine if the value is a regular expression", () => {

      expect(isRegExp(undefined)).toBe(false);
      expect(isRegExp(null)).toBe(false);
      expect(isRegExp({})).toBe(false);
      expect(isRegExp([])).toBe(false);
      expect(isRegExp(1)).toBe(false);
      expect(isRegExp(new RegExp(""))).toBe(true);
      expect(isRegExp(/.png/g)).toBe(true);
    });
  });

  describe("isString", () => {

    it("should determine if the value is a string", () => {

      expect(isString(undefined)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString("")).toBe(true);
    });
  });

  describe("isUndefined", () => {

    it("should determine if the value is undefined", () => {

      expect(isUndefined(null)).toBe(false);
      expect(isUndefined({})).toBe(false);
      expect(isUndefined([])).toBe(false);
      expect(isUndefined(new Date())).toBe(false);
      expect(isUndefined(undefined)).toBe(true);
    });
  });
});

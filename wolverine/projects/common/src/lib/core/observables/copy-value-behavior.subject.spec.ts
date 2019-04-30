import { CopyType } from "./copy-type.enum";
import { CopyValueBehaviorSubject } from "./copy-value-behavior.subject";

class SomeObject {
  public prop1: number;
  public prop2: string;
  public prop3: SomeSubObject;
}

class SomeSubObject {
  public prop1: number;
  public prop2: string;
}

describe("CopyValueBehavior Subject", () => {

  let value1: SomeObject;
  let value2: SomeObject;

  beforeEach(() => {

    value1 = {
      prop1: 1,
      prop2: "a",
      prop3: {
        prop1: 1,
        prop2: "a"
      }
    };

    value2 = {
      prop1: 2,
      prop2: "b",
      prop3: {
        prop1: 2,
        prop2: "b"
      }
    };

  });

  it(`should return an shallow copy of the subject to all subscribers`,  () => {

    const subject = new CopyValueBehaviorSubject(value1, CopyType.Shallow);
    const observable = subject.asObservable();

    let result1: SomeObject = null;
    let result2: SomeObject = null;

    observable.subscribe((result) => {
      result1 = result;
    });

    observable.subscribe((result) => {

      result2 = result;

      result1.prop2 = "b";
      result1.prop3.prop1 = 2;

      expect(result1).not.toBe(result2);
      expect(result1.prop1).toBe(result2.prop1);
      expect(result1.prop2).not.toBe(result2.prop2);
      expect(result1.prop3.prop1).toBe(result2.prop3.prop1);
      expect(result1.prop3.prop2).toBe(result2.prop3.prop2);
    });
  });

  it(`should return an deep copy of the subject to all subscribers`, () => {

    const subject = new CopyValueBehaviorSubject(value1, CopyType.Deep);
    const observable = subject.asObservable();

    let result1: SomeObject = null;
    let result2: SomeObject = null;

    observable.subscribe((result) => {
      result1 = result;
    });

    observable.subscribe((result) => {

      result2 = result;

      result1.prop2 = "b";
      result1.prop3.prop1 = 2;

      expect(result1).not.toBe(result2);
      expect(result1.prop1).toBe(result2.prop1);
      expect(result1.prop2).not.toBe(result2.prop2);
      expect(result1.prop3.prop1).not.toBe(result2.prop3.prop1);
      expect(result1.prop3.prop2).toBe(result2.prop3.prop2);
    });
  });

  it(`should return a copy of the latest subject to subscribers`, () => {

    const subject = new CopyValueBehaviorSubject(value1, CopyType.Deep);
    const observable = subject.asObservable();

    let result1: SomeObject = null;
    let result2: SomeObject = null;

    observable.subscribe((result) => {

      if (!result1) {
        result1 = result;
      }
      else {
        result2 = subject.value;

        expect(result1).not.toBe(value1);
        expect(result1.prop1).toBe(value1.prop1);
        expect(result1.prop3.prop2).toBe(value1.prop3.prop2);

        expect(result2).not.toBe(value2);
        expect(result2.prop1).toBe(value2.prop1);
        expect(result2.prop3.prop2).toBe(value2.prop3.prop2);

        expect(result1).not.toBe(result2);
        expect(result1.prop1).not.toBe(result2.prop1);
        expect(result1.prop2).not.toBe(result2.prop2);
        expect(result1.prop3).not.toBe(result2.prop3);
      }

    });

    subject.next(value2);
  });

});

import { shallowCopy } from "./shallow-copy.function";

describe("ShallowCopy Function", () => {

  let value1;
  let value2;
  let value3;

  beforeEach(() => {

    value1 = 10;

    value2 = ["1", "2", "3"];

    value3 = {
      prop1: 1,
      prop2: "a",
      prop3: {
        prop1: 1,
        prop2: "a"
      }
    };
  });

  it(`should return null when given the null`,  () => {

    const result = shallowCopy(null);
    expect(result).toBe(null);
  });

  it(`should return undefined when given undefined`, () => {

    const result = shallowCopy(undefined);
    expect(result).toBe(undefined);
  });

  it(`should return a copy of a value type`, () => {

    const result = shallowCopy(value1);
    expect(result).toBe(value1);
  });

  it(`should return a copy of an array`, () => {

    const result = shallowCopy(value2);
    expect(result).not.toBe(value2);
    expect(result[0]).toBe(value2[0]);
    expect(result[1]).toBe(value2[1]);
    expect(result[2]).toBe(value2[2]);
  });

  it(`should return a reference to internal objects`, () => {

    const result = shallowCopy(value3);

    expect(result).not.toBe(value3);

    result.prop2 = "b";
    result.prop3.prop2 = "b";

    expect(result.prop1).toBe(value3.prop1);
    expect(result.prop2).not.toBe(value3.prop2);
    expect(result.prop3.prop1).toBe(value3.prop3.prop1);
    expect(result.prop3.prop2).toBe(value3.prop3.prop2);
  });

});

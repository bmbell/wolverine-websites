import { snapshotObservableOf, toSnapshotObservable } from "./snapshot.observable";
import { BehaviorSubject } from "rxjs";

describe("SnapshotObservable Functions", () => {

  beforeEach(() => {
  });

  it(`toSnapshotObservable() should return a valid SnapshotObservable when given a BehaviorSubject`, () => {

    const firstValue = 123;
    const secondValue = 456;

    const behaviorSubject = new BehaviorSubject<number>(firstValue);
    const snapshotObservable = toSnapshotObservable(behaviorSubject);

    let result1 = null;

    snapshotObservable.subscribe((value) => {

      if (!result1) {
        result1 = value;
        expect(value).toBe(firstValue);
      }
      else {
        expect(value).toBe(secondValue);
      }
    });

    expect(snapshotObservable.value).toBe(firstValue);

    behaviorSubject.next(secondValue);

    expect(snapshotObservable.value).toBe(secondValue);
  });

  it(`snapshotObservableOf() should return a valid SnapshotObservable when given a value`, () => {

    const value = 5;

    const snapshotObservable = snapshotObservableOf(value);

    snapshotObservable.subscribe((val) => {
      expect(val).toBe(value);
    });

    expect(snapshotObservable.value).toBe(value);
  });

});

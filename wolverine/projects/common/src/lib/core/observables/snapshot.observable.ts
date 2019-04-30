import { Observable, of as observableOf, BehaviorSubject } from "rxjs";
import { CopyValueBehaviorSubject } from "./copy-value-behavior.subject";

/**
 * An observable that can also provide an instant "snapshot" of its current value
 */
export abstract class SnapshotObservable<T> extends Observable<T> {
  public abstract get value(): T;
}

/**
 * Converts a behavior subject to a snapshot observable
 * @param behaviorSubject A behavior subject (or a copy-value behavior subject)
 */
export function toSnapshotObservable<T>(behaviorSubject: BehaviorSubject<T> | CopyValueBehaviorSubject<T>): SnapshotObservable<T> {

  const observable = behaviorSubject.asObservable();

  addValueProperty(observable);

  return observable as SnapshotObservable<T>;
}

/**
 * Wraps a snapshot observable around a value
 * @param value A single value (non a streamable value)
 */
export function snapshotObservableOf<T>(value: T): SnapshotObservable<T> {

  const observable = observableOf(value);

  addValueProperty(observable);

  return observable as SnapshotObservable<T>;
}

function addValueProperty<T>(observable: Observable<T>) {

  Object.defineProperty(observable, "value", {
    get: () => {

      let value: T;

      observable.subscribe((v: T) => {
        value = v;
      }).unsubscribe();

      return value;
    }
  });
}

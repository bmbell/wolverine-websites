import {
  ObjectUnsubscribedError,
  Subject,
  Subscriber,
  Subscription,
  SubscriptionLike
  } from "rxjs";

import { deepCopy } from "../_shared/functions/copying/deep-copy.function";
import { shallowCopy } from "../_shared/functions/copying/shallow-copy.function";
import { CopyType } from "./copy-type.enum";

/**
 * Behavior subject that copies the data for each observer so that the observers
 * cannot alter the original data
 */
export class CopyValueBehaviorSubject<T> extends Subject<T> {

  // #region Constructor

  constructor(private _value: T, private _copyType: CopyType) {
    super();
  }

  // #endregion

  // #region Public Properties

  /**
   * The current value
   */
  public get value(): T {
    return this.getValue();
  }

  /**
   * Indicates the way the subject's data will be copied
   */
  public get copyType(): CopyType {
    return this._copyType;
  }

  // #endregion

  // #region Public Methods

  /** @deprecated This is an internal implementation detail, do not use. */
  public _subscribe(subscriber: Subscriber<T>): Subscription {

    const subscription = super._subscribe(subscriber);

    if (subscription && !(<SubscriptionLike>subscription).closed) {
      subscriber.next(this.copy(this.value));
    }

    return subscription;
  }

  /**
   * Sends the next value out to subscribers
   * @param value The new value
   */
  public next(value?: T) {

    this._value = value;

    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }

    if (!this.isStopped) {

      const { observers } = this;
      const len = observers.length;
      const copy = observers.slice();

      for (let i = 0; i < len; i++) {
        copy[i].next(this.copy(value));
      }
    }
  }

  // #endregion

  // #region Private Methods

  /**
   * Returns the current value
   */
  private getValue(): T {

    if (this.hasError) {
      throw this.thrownError;
    }
    else if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    else {
      return this.copy(this._value);
    }
  }

  private copy(value: T) {

    if (this._copyType === CopyType.Deep) {
      return deepCopy(value);
    }
    else {
      return shallowCopy(value);
    }
  }

  // #endregion
}

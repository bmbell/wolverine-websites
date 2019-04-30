/**
 * Modified from: https://github.com/w11k/ng2-rx-componentdestroyed
 * Original Author: Roman Roelofsen
 */

import {Observable, ReplaySubject } from "rxjs";
import {takeUntil} from "rxjs/operators";
import { OnDestroy } from "@angular/core";

export interface OnDestroyLike extends OnDestroy {
  __addedDestroyHook$: Observable<true>;
}

/**
 * Wires up the "take until" pattern for propertly disposing observables
 * @param lifeCycleObject The component, directive, pipe, or service that implements OnDestroy
 */
function lifeCycleObjectDestroyed(lifeCycleObject: OnDestroy): Observable<true> {

  const obj: OnDestroyLike = lifeCycleObject as any;

  if (!obj.__addedDestroyHook$) {

    const oldNgOnDestroy = obj.ngOnDestroy;
    const stop$ = new ReplaySubject<true>();

    obj.ngOnDestroy = () => {

      if (oldNgOnDestroy) {
        oldNgOnDestroy.apply(obj);
      }

      stop$.next(true);
      stop$.complete();
    };

    obj.__addedDestroyHook$ = stop$.asObservable();
  }

  return obj.__addedDestroyHook$;
}

/**
 * Observable pipe that automatically unsubscribes from an infinite observable
 * when the life-cycle object goes out of scope (i.e. it is destroyed).
 * WARNING: this method must be the last function in the pipe-chain!
 *
 * Usage:
 *
 * class MyComponent implements OnInit, OnDestroy {
 *
 *   public constructor(private _myService: MyService) {}
 *
 *   public ngOnInit() {
 *
 *     this._myService.myInfiniteObservable.pipe(takeUntilDestroyed(this)).subscribe((data) => {
 *        // handle the observable
 *     }));
 *   }
 *
 *   public ngOnDestroy() {
 *   }
 * }
 *
 * @param lifeCycleObject An Angular component, directive, or service that implements the "OnDestroy" interface
 */
export function takeUntilDestroyed<T>(lifeCycleObject: OnDestroy): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => source.pipe(takeUntil(lifeCycleObjectDestroyed(lifeCycleObject)));
}

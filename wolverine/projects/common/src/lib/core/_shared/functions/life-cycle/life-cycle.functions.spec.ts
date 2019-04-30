import { OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { takeUntilDestroyed } from "./take-until-destroyed.function";


const somethingToObserve = new BehaviorSubject(true);

class TestComponent implements OnDestroy {

  private _subscription: Subscription;

  public constructor() {
    this._subscription = somethingToObserve.pipe(takeUntilDestroyed(this)).subscribe(() => { });
  }

  public get subscription(): Subscription {
    return this._subscription;
  }

  public ngOnDestroy(): void {

  }

}

describe("Life Cycle Functions", () => {

  describe("TakeUntilDestroyed", () => {

    it(`should complete observables when the object is destroyed`, () => {

      const testComponent = new TestComponent();

      expect(testComponent.subscription.closed).toBe(false);

      testComponent.ngOnDestroy();

      expect(testComponent.subscription.closed).toBe(true);
    });
  });
});

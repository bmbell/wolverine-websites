// Modified from: http://brianflove.com/2018/01/11/angular-window-provider
// Original Author: Brian Love

import { isPlatformBrowser } from "@angular/common";
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from "@angular/core";

// USAGE:
//
// export class MyClass {
//
//   constructor(@Inject(WINDOW) private _window: Window) {}
// }
//
//
export const WINDOW = new InjectionToken("WINDOW_TOKEN");

export abstract class WindowReference {

  /**
   * Returns the native window or an empty object
   */
  public get nativeWindow(): Window  {
    throw new Error("Not implemented.");
  }
}

export class BrowserWindowReference extends WindowReference {

  // #region Constructor

  constructor() {
    super();
  }

  // #endregion

  // #region Public Properties

  public get nativeWindow(): Window {
    return window;
  }

  // #endregion
}

/**
 * Generates the window object
 * @param windowReference The window reference
 * @param platformId The platform's id
 */
export function windowFactory(windowReference: WindowReference, platformId: object): Window | object {

  if (isPlatformBrowser(platformId)) {
    return windowReference.nativeWindow;
  }

  return new Object();
}

/**
 * Creates the browser window provider
 */
export const browserWindowProvider: ClassProvider = {
  provide: WindowReference,
  useClass: BrowserWindowReference
};

/**
 * Creates the generic window provider
 */
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowReference, PLATFORM_ID ]
};

/**
 * Array of the providers
 */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider
];

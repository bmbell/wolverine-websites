import { InjectionToken } from "@angular/core";

export const CONFIGURATION = new InjectionToken("BELL_CONFIGURATION");

export interface Configuration {

  isProduction: boolean;

  baseWebServicesUrl: string;

  data?: any;
}

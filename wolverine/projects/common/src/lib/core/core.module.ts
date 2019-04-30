import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";

import { ContentHostDirective } from "./_shared/directives/content-host.directive";
import { TrackScrollDirective } from "./_shared/directives/track-scroll.directive";
import { SafePipe } from "./_shared/pipes/safe.pipe";
import { Configuration, CONFIGURATION } from "./configuration/configuration.model";
import { WINDOW_PROVIDERS } from "./window/window.provider";


@NgModule({

  imports: [
    CommonModule,
    HttpClientModule
  ],

  declarations: [
    ContentHostDirective,
    TrackScrollDirective,
    SafePipe
  ],

  exports: [
    CommonModule,
    HttpClientModule,

    ContentHostDirective,
    TrackScrollDirective,
    SafePipe
  ]
})
export class CoreModule {

  /**
   * Configures the core module and its global providers
   */
  public static forRoot(configuration: Configuration): ModuleWithProviders {

    return {
      ngModule: CoreModule,
      providers: [
        { provide: CONFIGURATION, useValue: configuration },
        WINDOW_PROVIDERS
      ]
    };
  }
}

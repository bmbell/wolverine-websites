import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./core/layout/layout.component";
import { CoreModule } from "./core/core.module";
import { MazeModule } from "./mazes/maze.module";


@NgModule({
  declarations: [],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MazeModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

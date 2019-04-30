import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { CoreModule as CommonCoreModule } from "@bell/common";

import { environment } from "../../environments/environment";
import { MazeModule } from "../mazes/maze.module";
import { DifficultyScreenComponent } from "./difficulty-screen/difficulty-screen.component";
import { LayoutComponent } from "./layout/layout.component";
import { PlayScreenComponent } from "./play-screen/play-screen.component";
import { MatSnackBarModule } from "@angular/material";


@NgModule({
  declarations: [
    DifficultyScreenComponent,
    LayoutComponent,
    PlayScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonCoreModule.forRoot(environment),
    MazeModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    DifficultyScreenComponent,
    LayoutComponent,
    PlayScreenComponent
  ]
})
export class CoreModule { }

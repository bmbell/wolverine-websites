import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";

import { MazeCellComponent } from "./maze-cell/maze-cell.component";
import { MazeComponent } from "./maze/maze.component";

@NgModule({
  declarations: [
    MazeComponent,
    MazeCellComponent
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],

  exports: [
    MazeComponent
  ]
})
export class MazeModule { }

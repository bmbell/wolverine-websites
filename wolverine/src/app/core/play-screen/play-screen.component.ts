import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { Difficulty } from "../_shared/enumerations/difficulty.enum";
import { GameStateService } from "../_shared/services/game-state.service";
import { Maze } from "../../mazes/_shared/models/maze.model";
import { MazeService } from "../../mazes/_shared/services/maze.service";
import { MazeComponent } from "../../mazes/maze/maze.component";

const EASY_MAZE_HEIGHT = 11;
const EASY_MAZE_WIDTH = 11;
const MEDIUM_MAZE_HEIGHT = 17;
const MEDIUM_MAZE_WIDTH = 17;
const HARD_MAZE_HEIGHT = 21;
const HARD_MAZE_WIDTH = 21;

@Component({
  selector: "wolverine-play-screen",
  templateUrl: "./play-screen.component.html",
  styleUrls: ["./play-screen.component.scss"]
})
export class PlayScreenComponent implements OnInit {

  // #region Private Fields

  private _autoSolveUsed: boolean;
  private _mazeData: Maze;

  // #endregion

  // #region Constructor

  public constructor(
    private _snackBar: MatSnackBar,
    private _gameStateService: GameStateService,
    private _mazeService: MazeService) {

    this._autoSolveUsed = false;
    this._mazeData = null;
  }

  // #endregion

  // #region Public Properties

  public get isSolving(): boolean {
    return this.maze ? this.maze.isSolving : false;
  }

  public get isSolved(): boolean {
    return this.maze ? this.maze.isSolved : false;
  }

  public get mazeData(): Maze {
    return this._mazeData;
  }

  @ViewChild("maze")
  public maze: MazeComponent;

  // #endregion

  // #region Public Methods

  public onSolveButtonClick(): void {

    this._autoSolveUsed = true;

    this.maze.markSolving();

    this._mazeService.solveMaze(this._mazeData, this.maze.tokenCell.id, this.maze.exitCell.id).subscribe((solutionPath) => {
      this.maze.solve(solutionPath);
    });
  }

  public onResetButtonClick(): void {
    this._autoSolveUsed = false;
    this.maze.reset();
    this._snackBar.dismiss();
  }

  public onMainMenuButtonClick(): void {
    this._gameStateService.reset();
    this._snackBar.dismiss();
  }

  public onSolved(): void {

    if (!this._autoSolveUsed) {
      this._snackBar.open("Congratulations! You escaped the maze!", null, {
        verticalPosition: "bottom"
      });
    }
  }

  public ngOnInit(): void {

    this.generateMaze();
  }

  private generateMaze(): void {

    let height: number;
    let width: number;

    switch (this._gameStateService.difficulty) {

      case Difficulty.Easy:
        height = EASY_MAZE_HEIGHT;
        width = EASY_MAZE_WIDTH;
        break;

      case Difficulty.Medium:
        height = MEDIUM_MAZE_HEIGHT;
        width = MEDIUM_MAZE_WIDTH;
        break;

      case Difficulty.Hard:
        height = HARD_MAZE_HEIGHT;
        width = HARD_MAZE_WIDTH;
        break;
    }

    this._mazeService.generateMaze(height, width).subscribe(maze => {
      this._mazeData = maze;
    });
  }

  // #endregion
}

import { Component, HostListener, Input, Output, EventEmitter } from "@angular/core";
import { MazeCell } from "../_shared/models/maze-cell.model";
import { Maze } from "../_shared/models/maze.model";
import { Direction } from "../_shared/enumerations/direction.enum";
import { KeyCode } from "@bell/common";

@Component({
  selector: "wolverine-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.scss"]
})
export class MazeComponent {

  // #region Private Fields

  private _maze: Maze;
  private _rows: MazeCell[][];
  private _isLoading: boolean;
  private _isSolved: boolean;

  private _tokenXPosition: number;
  private _tokenYPosition: number;
  private _isSolving: boolean;

  // #endregion

  // #region Public Constructor

  public constructor() {

    this._rows = null;
    this._isLoading = true;
    this.solved = new EventEmitter();

    this.reset();
  }

  // #endregion

  // #region Public Properties

  /**
   * THe maze data
   */
  @Input()
  public set data(value: Maze) {

    if (value) {
      this.setupMaze(value);
      this._isLoading = false;
    }
  }

  /**
   * Event triggered when the maze is solved
   */
  @Output()
  public solved: EventEmitter<void>;

  /**
   * The rows of the maze, used for rendering
   */
  public get rows(): MazeCell[][] {
    return this._rows;
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  /**
   * The cell with the player's token in it
   */
  public get tokenCell(): MazeCell {
    return this._rows ? this._rows[this._tokenYPosition][this._tokenXPosition] : null;
  }

  /**
   * The cell with the exit in it
   */
  public get exitCell(): MazeCell {
    return this._maze ? this._maze.cells[this._maze.cells.length - 1] : null;
  }

  /**
   * Indicates whether the maze is in the "solving" phase
   */
  public get isSolving(): boolean {
    return this._isSolving;
  }

  /**
   * Indicates whether the maze has been solved
   */
  public get isSolved(): boolean {
    return this._isSolved;
  }

  // #endregion

  // #region Public Methods

  /**
   * Resets the maze
   */
  public reset(): void {

    this._tokenXPosition = 0;
    this._tokenYPosition = 0;

    this._isSolving = false;
    this._isSolved = false;
  }

  /**
   * Marks the maze so that it enters the auto-solving state
   */
  public markSolving(): void {
    this._isSolving = true;
  }

  /**
   * Executes the provided solution on the maze
   * @param solution A list of maze cell ids that represents the solution
   */
  public solve(solution: string[]): void {

    this._isSolving = true;
    this.executeSolutionStep(solution);
  }

  /**
   * The key-down event handler for maze navigation
   * @param event The keyboard event
   */
  @HostListener("document:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {

    switch (event.key) {

      case KeyCode.ArrowUp:
        this.move(Direction.North);
        break;

      case KeyCode.ArrowRight:
        this.move(Direction.East);
        break;

      case KeyCode.ArrowDown:
        this.move(Direction.South);
        break;

      case KeyCode.ArrowLeft:
        this.move(Direction.West);
        break;
    }
  }

  /**
   * Indicates whether the given cell has the player's token
   * @param cell The cell to check
   * @returns True if the given cell contains the player's token; otherwise false
   */
  public hasPlayerToken(cell: MazeCell): boolean {
    return cell === this.tokenCell;
  }

  /**
   * Indicates whether the given cell has the exit
   * @param cell The cell to check
   * @returns True if the current cell is an exit cell; otherwise false
   */
  public isExit(cell: MazeCell): boolean {
    return cell === this.exitCell;
  }

  // #endregion

  // #region Private Methods

  private setupMaze(maze: Maze): void {

    this._maze = maze;
    this._tokenXPosition = 0;
    this._tokenYPosition = 0;

    this._rows = [];

    for (let i = 0; i < maze.height; i++) {

      this._rows[i] = [];

      for (let j = 0; j < maze.width; j++) {

        const cell = maze.cells[i * maze.width + j];
        this._rows[i].push(cell);
      }
    }
  }

  private move(direction: Direction): void {

    if (!this._isSolved && !this._isSolving && this.tokenCell && this.tokenCell.passages.includes(direction)) {

      switch (direction) {

        case Direction.North:
          this._tokenYPosition--;
          break;

        case Direction.East:
          this._tokenXPosition++;
          break;

        case Direction.South:
          this._tokenYPosition++;
          break;

        case Direction.West:
          this._tokenXPosition--;
          break;
      }

      if (this.tokenCell === this._maze.cells[this._maze.cells.length - 1]) {
        this.markSolved();
      }
    }
  }

  private executeSolutionStep(solution: string[]): void {

    if (solution && solution.length > 0) {

      const nextId = solution.shift();
      this.goToMazeCell(nextId);

      if (solution.length === 0) {
        this._isSolving = false;
        this.markSolved();
      }
      else {
        setTimeout(() => {
          this.executeSolutionStep(solution);
        }, 250);
      }
    }
  }

  private goToMazeCell(id: string): void {

    for (let y = 0; y < this._maze.height; y++) {
      for (let x = 0; x < this._maze.width; x++) {

        const cell = this._rows[y][x];

        if (cell.id === id) {
          this._tokenXPosition = x;
          this._tokenYPosition = y;
        }
      }
    }
  }

  private markSolved(): void {
    this._isSolved = true;
    this.solved.emit();
  }

  // #endregion
}

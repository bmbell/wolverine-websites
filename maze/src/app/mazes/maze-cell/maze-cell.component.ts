import { Component, Input } from "@angular/core";
import { Direction } from "../_shared/enumerations/direction.enum";

@Component({
  selector: "wolverine-maze-cell",
  templateUrl: "./maze-cell.component.html",
  styleUrls: ["./maze-cell.component.scss"]
})
export class MazeCellComponent {

  // #region Private Fields

  private _canMoveNorth: boolean;
  private _canMoveSouth: boolean;
  private _canMoveEast: boolean;
  private _canMoveWest: boolean;

  // #endregion

  // #region Constructors

  public constructor() {

    this.id = null;
    this.hasPlayerToken = false;
    this._canMoveNorth = false;
    this._canMoveSouth = false;
    this._canMoveEast = false;
    this._canMoveWest = false;
  }

  // #endregion

  // #region Public Properties

  /**
   * The cell's id
   */
  @Input()
  public id: string;

  /**
   * Indicates whether the cell has the player's token
   */
  @Input()
  public hasPlayerToken: boolean;

  /**
   * Indicates whether the cell contains the exit
   */
  @Input()
  public isExit: boolean;

  /**
   * The passages (exit paths) for the current cell
   */
  @Input()
  public set passages(value: Direction[]) {
    this.setupPassages(value);
  }

  /**
   * Indicates whether the player can move north from this cell
   */
  public get canMoveNorth(): boolean {
    return this._canMoveNorth;
  }

  /**
   * Indicates whether the player can move south from this cell
   */
  public get canMoveSouth(): boolean {
    return this._canMoveSouth;
  }

  /**
   * Indicates whether the player can move east from this cell
   */
  public get canMoveEast(): boolean {
    return this._canMoveEast;
  }

  /**
   * Indicates whether the player can move west from this cell
   */
  public get canMoveWest(): boolean {
    return this._canMoveWest;
  }

  // #endregion

  // #region Private Methods

  private setupPassages(passages: Direction[]): void {

    this.clearPassages();

    if (passages) {

      passages.forEach(passage => {

        switch (passage) {

          case Direction.North:
            this._canMoveNorth = true;
            break;

          case Direction.South:
            this._canMoveSouth = true;
            break;

          case Direction.East:
            this._canMoveEast = true;
            break;

          case Direction.West:
            this._canMoveWest = true;
            break;
        }
      });
    }
  }

  private clearPassages() {
    this._canMoveNorth = false;
    this._canMoveSouth = false;
    this._canMoveEast = false;
    this._canMoveWest = false;
  }

  // #endregion
}

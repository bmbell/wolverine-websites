import { Direction } from "../enumerations/direction.enum";

export interface MazeCell {

  /**
   * The cell's id
   */
  id: string;

  /**
   * The available passages from this cell
   */
  passages: Direction[];
}

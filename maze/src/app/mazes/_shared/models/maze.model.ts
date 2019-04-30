import { MazeCell } from "./maze-cell.model";

export interface Maze {

  /**
   * The cells in the maze
   */
  cells: MazeCell[];

  /**
   * The height of the maze
   */
  height: number;

  /**
   * The width of the maze
   */
  width: number;
}

import { Maze } from "./maze.model";

export interface SolveMazeRequest {

  /**
   * The maze to solve
   */
  maze: Maze;

  /**
   * The starting point in the maze
   */
  startPointId: string;

  /**
   * The end point (finish)
   */
  endPointId: string;
}

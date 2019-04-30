import { Difficulty } from "../enumerations/difficulty.enum";
import { Maze } from "../../../mazes/_shared/models/maze.model";

export interface GameState {

  /**
   * The difficulty setting of the maze
   */
  difficulty: Difficulty;

  /**
   * The randomly generated maze
   */
  maze: Maze;
}

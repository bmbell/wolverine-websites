import { Injectable } from "@angular/core";

import { Maze } from "../models/maze.model";
import { WebOperation } from "@bell/common";
import { Observable } from "rxjs";
import { SolveMazeRequest } from "../models/solve-maze-request.model";

@Injectable({
  providedIn: "root"
})
export class MazeService {

  // #region Constructor

  constructor(private _webOperation: WebOperation) {

  }

  // #endregion

  // #region Public Methods

  /**
   * Randomly generates a maze of the specified height and width
   * @param height The height of the maze
   * @param width The width of the maze
   */
  public generateMaze(height: number, width: number): Observable<Maze> {
    return this._webOperation.get<Maze>(`api/v1/mazes?height=${height}&width=${width}`);
  }

  /**
   * Solves the given maze, start point, and end point
   * @param maze The maze to solve
   * @param startPoint The starting point's maze cell id
   * @param endPoint The end point's maze cell id
   */
  public solveMaze(maze: Maze, startPointId: string, endPointId: string): Observable<string[]> {

    const request: SolveMazeRequest = {
      maze, startPointId, endPointId
    };

    return this._webOperation.post<string[]>("api/v1/mazes/solve", request);
  }

  // #endregion
}

import { Injectable } from "@angular/core";
import { Difficulty } from "../enumerations/difficulty.enum";

@Injectable({
  providedIn: "root"
})
export class GameStateService {

  private _difficulty: Difficulty;

  constructor() {
    this._difficulty = null;
  }


  public get difficulty(): Difficulty {
    return this._difficulty;
  }

  public set difficulty(value: Difficulty) {

    if (value) {
      this._difficulty = value;
    }
  }

  public reset(): void {
    this._difficulty = null;
  }



}

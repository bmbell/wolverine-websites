import { Component } from "@angular/core";
import { GameStateService } from "../_shared/services/game-state.service";

@Component({
  selector: "wolverine-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent{

  constructor(private _gameStateService: GameStateService) {

  }

  public get difficultyWasSet(): boolean {
    return !!this._gameStateService.difficulty;
  }

}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GameStateService } from "../_shared/services/game-state.service";
import { Difficulty } from "../_shared/enumerations/difficulty.enum";

@Component({
  selector: "wolverine-difficulty-screen",
  templateUrl: "./difficulty-screen.component.html",
  styleUrls: ["./difficulty-screen.component.scss"]
})
export class DifficultyScreenComponent {

  // #region Constructor

  public constructor(
    private _router: Router,
    private _gameStateService: GameStateService) {

  }

  // #endregion

  // #region Public Methods

  public onEasyButtonPress(): void {

    this._gameStateService.difficulty = Difficulty.Easy;
    this.goToPlayScreen();
  }

  public onMediumButtonPress(): void {

    this._gameStateService.difficulty = Difficulty.Medium;
    this.goToPlayScreen();
  }

  public onHardButtonPress(): void {

    this._gameStateService.difficulty = Difficulty.Hard;
    this.goToPlayScreen();
  }

  // #endregion

  // #region Private Methods

  private goToPlayScreen(): void {
    this._router.navigate(["./play"]);
  }

  // #endregion

}

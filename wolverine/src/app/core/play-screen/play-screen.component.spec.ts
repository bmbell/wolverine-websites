import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "mock-component";
import { Observable, of as observableOf } from "rxjs";

import { Maze } from "../../mazes/_shared/models/maze.model";
import { MazeService } from "../../mazes/_shared/services/maze.service";
import { MazeComponent } from "../../mazes/maze/maze.component";
import { PlayScreenComponent } from "./play-screen.component";


class MockMazeService {

  public generateMaze(): Observable<Maze> {
    return observableOf({} as Maze);
  }
}

describe("PlayScreenComponent", () => {
  let component: PlayScreenComponent;
  let fixture: ComponentFixture<PlayScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [
        PlayScreenComponent,
        MockComponent(MazeComponent)
      ],
      providers: [
        { provide: MazeService, useClass: MockMazeService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should compile`, () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";
import { MockComponent } from "mock-component";

import { MazeCellComponent } from "../maze-cell/maze-cell.component";
import { MazeComponent } from "./maze.component";
import { Maze } from "../_shared/models/maze.model";
import { Direction } from "../_shared/enumerations/direction.enum";


const maze: Maze = {
  height: 3,
  width: 3,
  cells: [
    { id: "1", passages: [ Direction.East, Direction.South] },
    { id: "2", passages: [ Direction.West ] },
    { id: "3", passages: [ Direction.South ] },
    { id: "4", passages: [ Direction.North, Direction.South ] },
    { id: "5", passages: [ Direction.South, Direction.East ] },
    { id: "6", passages: [ Direction.South, Direction.West, Direction.North] },
    { id: "7", passages: [ Direction.East, Direction.North ] },
    { id: "8", passages: [ Direction.West, Direction.North ] },
    { id: "9", passages: [ Direction.North ] },
  ]
};

describe("MazeComponent", () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        MockComponent(MazeCellComponent),
        MazeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should compile`, () => {
    expect(component).toBeTruthy();
  });
});

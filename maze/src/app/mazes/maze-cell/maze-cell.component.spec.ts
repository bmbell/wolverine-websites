import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";

import { MazeCellComponent } from "./maze-cell.component";
import { Direction } from "../_shared/enumerations/direction.enum";

describe("MazeCellComponent", () => {
  let component: MazeCellComponent;
  let fixture: ComponentFixture<MazeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [ MazeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should compile`, () => {
    expect(component).toBeTruthy();
  });

  it(`should not allow movement in any direction by default`, () => {
    expect(component.canMoveNorth).toBe(false);
    expect(component.canMoveSouth).toBe(false);
    expect(component.canMoveEast).toBe(false);
    expect(component.canMoveWest).toBe(false);
  });

  it(`should allow movement through given passages`, () => {

    component.passages = [Direction.North];

    expect(component.canMoveNorth).toBe(true);
    expect(component.canMoveSouth).toBe(false);
    expect(component.canMoveEast).toBe(false);
    expect(component.canMoveWest).toBe(false);

    component.passages = [Direction.North, Direction.South, Direction.East, Direction.West];

    expect(component.canMoveNorth).toBe(true);
    expect(component.canMoveSouth).toBe(true);
    expect(component.canMoveEast).toBe(true);
    expect(component.canMoveWest).toBe(true);

    component.passages = [Direction.South];

    expect(component.canMoveNorth).toBe(false);
    expect(component.canMoveSouth).toBe(true);
    expect(component.canMoveEast).toBe(false);
    expect(component.canMoveWest).toBe(false);

  });

});

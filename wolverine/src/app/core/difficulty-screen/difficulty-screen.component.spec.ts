import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DifficultyScreenComponent } from "./difficulty-screen.component";

describe("DifficultyScreenComponent", () => {
  let component: DifficultyScreenComponent;
  let fixture: ComponentFixture<DifficultyScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ DifficultyScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should compile`, () => {
    expect(component).toBeTruthy();
  });
});

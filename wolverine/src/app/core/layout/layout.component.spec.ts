import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { LayoutComponent } from "./layout.component";
import { MockComponent } from "mock-component";
import { PlayScreenComponent } from "../play-screen/play-screen.component";
import { DifficultyScreenComponent } from "../difficulty-screen/difficulty-screen.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LayoutComponent,
        MockComponent(DifficultyScreenComponent),
        MockComponent(PlayScreenComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should compile`, () => {
    expect(component).toBeTruthy();
  });
});

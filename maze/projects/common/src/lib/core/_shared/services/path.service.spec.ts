import { TestBed, inject } from "@angular/core/testing";

import { PathService } from "./path.service";

describe("Path Service", () => {

  let pathService: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(inject([PathService], (_pathService: PathService) => {
    pathService = _pathService;
  }));

  it(`should compile`, () => {
    expect(pathService).toBeTruthy();
  });

  it(`should be able to join two paths together`, () => {

    let path1 = " http://www.steak.com/ ";
    let path2 = " /dinner ";
    const expectedResult = "http://www.steak.com/dinner";

    expect(pathService.join(path1, path2)).toBe(expectedResult);

    path1 = "http://www.steak.com";

    expect(pathService.join(path1, path2)).toBe(expectedResult);

    path2 = "dinner";

    expect(pathService.join(path1, path2)).toBe(expectedResult);

    path1 = "http://www.steak.com/";

    expect(pathService.join(path1, path2)).toBe(expectedResult);

    path1 = null;

    expect(pathService.join(path1, path2)).toBe(path2);

    path1 = "http://www.steak.com";
    path2 = null;

    expect(pathService.join(path1, path2)).toBe(path1);

    path1 = null;
    path2 = null;

    expect(pathService.join(path1, path2)).toBe(null);
  });

  it(`should be able to remove a trailing slash`, () => {

    expect(pathService.removeTrailingSlash("something/")).toBe("something");
    expect(pathService.removeTrailingSlash("somethingElse")).toBe("somethingElse");
    expect(pathService.removeTrailingSlash("somethingMore//")).toBe("somethingMore/");
    expect(pathService.removeTrailingSlash("")).toBe("");
    expect(pathService.removeTrailingSlash(null)).toBe(null);
    expect(pathService.removeTrailingSlash(undefined)).toBe(null);
  });

  it(`should be able to remove a leading slash`, () => {

    expect(pathService.removeLeadingSlash("/something")).toBe("something");
    expect(pathService.removeLeadingSlash("/somethingElse")).toBe("somethingElse");
    expect(pathService.removeLeadingSlash("//somethingMore")).toBe("/somethingMore");
    expect(pathService.removeLeadingSlash("")).toBe("");
    expect(pathService.removeLeadingSlash(null)).toBe(null);
    expect(pathService.removeLeadingSlash(undefined)).toBe(null);
  });

  it(`should be able to find the parts of the path`, () => {

    let path = "/cow/jones";
    let parts = pathService.findParts(path);

    expect(parts.length).toBe(2);
    expect(parts[0]).toBe("cow");
    expect(parts[1]).toBe("jones");

    path = "cow/jones";
    parts = pathService.findParts(path);

    expect(parts.length).toBe(2);
    expect(parts[0]).toBe("cow");
    expect(parts[1]).toBe("jones");

    path = "";
    parts = pathService.findParts(path);

    expect(parts.length).toBe(0);

    path = "/";
    parts = pathService.findParts(path);

    expect(parts.length).toBe(0);

    path = null;
    parts = pathService.findParts(path);

    expect(parts.length).toBe(0);
  });

});

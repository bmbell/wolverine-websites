import { TestBed, inject } from "@angular/core/testing";

import { UrlService } from "./url.service";

describe("Url Service", () => {

  let urlService: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(inject([UrlService], (_urlService: UrlService) => {
    urlService = _urlService;
  }));

  it(`should compile`, () => {
    expect(urlService).toBeTruthy();
  });

  it(`should be able to add query parameters to a url`, () => {

    let url = "http://www.animals.com/";
    url = urlService.addQueryParameter(url, "cow", "moo");

    expect(url).toBe("http://www.animals.com?cow=moo");

    url = urlService.addQueryParameter(url, "ducks", "quack");

    expect(url).toBe("http://www.animals.com?cow=moo&ducks=quack");

    url = "http://www.rebels.com";
    url = urlService.addQueryParameter(url, "team", "blue");

    expect(url).toBe("http://www.rebels.com?team=blue");

    url = null;
    url = urlService.addQueryParameter(url, "cows", "moo");

    expect(url).toBe("?cows=moo");
  });

  it(`should be able to find the parts of the path`, () => {

    let url = "http://www.animals.com/cow";
    let parts = urlService.findPathParts(url);

    expect(parts.length).toBe(1);
    expect(parts[0]).toBe("cow");

    url = "http://www.animals.com/cow/jones";
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(2);
    expect(parts[0]).toBe("cow");
    expect(parts[1]).toBe("jones");

    url = "/cow/jones";
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(2);
    expect(parts[0]).toBe("cow");
    expect(parts[1]).toBe("jones");

    url = "cow/jones";
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(2);
    expect(parts[0]).toBe("cow");
    expect(parts[1]).toBe("jones");

    url = "";
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(0);

    url = "/";
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(0);

    url = null;
    parts = urlService.findPathParts(url);

    expect(parts.length).toBe(0);
  });

  it(`should be able to find query parameters`, () => {

    let url = "http://www.animals.com?dogs=bark&cows=moo&ducks=quack";
    let params = urlService.findQueryParameters(url);

    expect(params).toEqual({dogs: "bark", ducks: "quack", cows: "moo"});

    url = "http://www.animals.com/?dogs=bark&cows=moo&ducks=quack";
    params = urlService.findQueryParameters(url);

    expect(params).toEqual({dogs: "bark", ducks: "quack", cows: "moo"});

    url = "http://www.someUrl.com";
    params = urlService.findQueryParameters(url);

    expect(params).toEqual({});

    url = "";
    params = urlService.findQueryParameters(url);

    expect(params).toEqual({});
  });

  it(`should be able to remove query parameters`, () => {

    let url = "http://www.animals.com?dogs=bark&cows=moo&ducks=quack";

    url = urlService.removeQueryParameter(url, "cow");

    expect(url).toBe("http://www.animals.com?dogs=bark&cows=moo&ducks=quack");

    url = urlService.removeQueryParameter(url, "cows");

    expect(url).toBe("http://www.animals.com?dogs=bark&ducks=quack");

    url = urlService.removeQueryParameter(url, "dogs");

    expect(url).toBe("http://www.animals.com?ducks=quack");

    url = urlService.removeQueryParameter(url, "ducks");

    expect(url).toBe("http://www.animals.com");

    url = urlService.removeQueryParameter(url, "");

    expect(url).toBe("http://www.animals.com");

    url = null;

    url = urlService.removeQueryParameter(url, "");

    expect(url).toBe(null);
  });

});

import { WebOperation } from "./web-operation.service";
import { TestBed, inject } from "@angular/core/testing";
import { ConfigurationService } from "../configuration/configuration.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PatchRequest } from "./patch-request.model";

const WEBSITE_URL = "https://website";
const WEBSERVICES_URL = "https://webservices";

class MockConfigurationService {

  public get baseWebsiteUrl(): string {
    return WEBSITE_URL;
  }

  public get baseWebServicesUrl(): string {
    return WEBSERVICES_URL;
  }
}

class MockHttpClient {

  public get() {}
  public post() {}
  public put() {}
  public patch() {}
  public delete() {}
}

describe("Web Operation Service", () => {

  let webOperation: WebOperation;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigurationService, useClass: MockConfigurationService },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
  });

  beforeEach(inject([WebOperation, HttpClient], (_webOperation: WebOperation, _httpClient: HttpClient) => {
    webOperation = _webOperation;
    httpClient = _httpClient;
  }));

  it(`should get web resources`, () => {

    const relativeUrl = "someUrl";

    spyOn(httpClient, "get");

    expect(httpClient.get).not.toHaveBeenCalled();

    webOperation.get(relativeUrl);

    expect(httpClient.get).toHaveBeenCalledWith(`${WEBSERVICES_URL}/${relativeUrl}`, jasmine.anything());
  });

  it(`should post web resources`, () => {

    const someData = {};
    spyOn(httpClient, "post");

    expect(httpClient.post).not.toHaveBeenCalled();

    webOperation.post("someUrl", someData);

    expect(httpClient.post).toHaveBeenCalledWith(jasmine.anything(), someData, jasmine.anything());
  });

  it(`should put web resources`, () => {

    const someData = {};
    spyOn(httpClient, "put");

    expect(httpClient.put).not.toHaveBeenCalled();

    webOperation.put("someUrl", someData);

    expect(httpClient.put).toHaveBeenCalledWith(jasmine.anything(), someData, jasmine.anything());
  });

  it(`should patch web resources`, () => {

    const patchData: PatchRequest[] = [
      PatchRequest.add("a", 10),
      PatchRequest.replace("b", "no"),
      PatchRequest.move("c", "d"),
      PatchRequest.copy("e", "f"),
      PatchRequest.test("g", "yes")
    ];

    const patchJsonString = `
      [
        {"op":"add","path":"a","value":10},
        {"op":"replace","path":"b","value":"no"},
        {"op":"move","path":"d","from":"c"},
        {"op":"copy","path":"f","from":"e"},
        {"op":"test","path":"g","value":"yes"}
      ]`;

    spyOn(httpClient, "patch");

    expect(httpClient.patch).not.toHaveBeenCalled();

    webOperation.patch("someUrl", patchData);

    expect(httpClient.patch).toHaveBeenCalledWith(jasmine.anything(), patchJsonString.replace(/\s+/g, ""), jasmine.anything());
  });

  it(`should delete web resources`, () => {

    spyOn(httpClient, "delete");

    expect(httpClient.delete).not.toHaveBeenCalled();

    webOperation.delete("someUrl");

    expect(httpClient.delete).toHaveBeenCalled();
  });

  it(`should allow for website base urls`, () => {

    const relativeUrl = "someUrl";

    spyOn(httpClient, "get");

    webOperation.get(relativeUrl, { baseUrl: "website"});

    expect(httpClient.get).toHaveBeenCalledWith(`${WEBSITE_URL}/${relativeUrl}`, jasmine.anything());
  });

  it(`should allow for base url overrides`, () => {

    const baseUrl = "http://override";
    const relativeUrl = "someUrl";

    spyOn(httpClient, "get");

    webOperation.get(relativeUrl, { baseUrlOverride: baseUrl});

    expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/${relativeUrl}`, jasmine.anything());
  });

  it(`should allow setting different headers`, () => {

    const headers: HttpHeaders = new HttpHeaders({
      header1: "value1"
    });

    spyOn(httpClient, "get");

    webOperation.get("someUrl", { headers });

    expect(httpClient.get).toHaveBeenCalledWith(jasmine.anything(), { headers });
  });
});

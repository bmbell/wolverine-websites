import { HttpClientTestingModule } from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";

import { WINDOW } from "../window/window.provider";
import { CONFIGURATION } from "./configuration.model";
import { ConfigurationService } from "./configuration.service";

const MOCK_WINDOW = {
  location: {
    protocol: "",
    host: ""
  }
};

const configuration = {
  baseWebServicesUrl: "SOME_URL"
};

describe(`Configuration Service`, () => {

  let configurationService: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: WINDOW, useValue: MOCK_WINDOW},
        { provide: CONFIGURATION, useValue: configuration },
      ]
    });
  });

  beforeEach(inject([ConfigurationService], (_configurationService: ConfigurationService) => {
    configurationService = _configurationService;
  }));

  it(`should compile`, () => {
    expect(configurationService).toBeTruthy();
  });

});

import { Injectable, Inject } from "@angular/core";

import { WINDOW } from "../window/window.provider";
import { CONFIGURATION, Configuration } from "./configuration.model";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {

  // #region Private Fields

  private _configData: any;

  private _isProductionEnvironment: boolean;
  private _baseWebServicesUrl: string;

  private _baseWebsiteUrl: string;

  // #endregion

  // #region Constructor

  constructor(
    @Inject(WINDOW) window: any,
    @Inject(CONFIGURATION) configuration: any) {

    const win = window as Window;
    const location = win.location;
    this._baseWebsiteUrl = `${location.protocol}//${location.host}`;

    this.loadConfiguration(configuration as Configuration);
  }

  // #endregion

  // #region Public Properties

  /**
   * The base website url
   */
  public get baseWebsiteUrl(): string {
    return this._baseWebsiteUrl;
  }

  /**
   * The base web services url
   */
  public get baseWebServicesUrl(): string {
    return this._baseWebServicesUrl;
  }

  /**
   * Indicates whether the current environment is a local environment
   */
  public get isLocalEnvironment(): boolean {
    return this.baseWebsiteUrl.includes("localhost:");
  }

  public get isProductionEnvironment(): boolean {
    return this._isProductionEnvironment;
  }

  // #endregion

  // #region Public Methods

  /**
   * Reads the data node of the config file.  Optionally, it will return a specific item specified by the key, if found.
   * (i.e. "urls" would return the urls node, whereas "urls.webServiceA", would return the webServiceA node)
   * @param key? The key corresponding to the specific node [optional]
   * @returns The specified configuration data, if found; otherwise null
   */
  public readData(key?: string): any {

    if (!key) {
      return this._configData;
    }
    else {
      return key.split(".").reduce((obj, index) => obj ? obj[index] : null, this._configData);
    }
  }

  // #endregion

  // #region Private Methods

  private loadConfiguration(config: Configuration): void {

    this._configData = config.data || null;

    this._isProductionEnvironment = config.isProduction;
    this._baseWebServicesUrl = this.isLocalEnvironment ? "/local" : config.baseWebServicesUrl;

    if (!this._baseWebServicesUrl) {
      throw Error(`The "baseWebServicesUrl" must be configured!`);
    }
  }

  // #endregion
}

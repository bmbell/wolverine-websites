import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ConfigurationService } from "../configuration/configuration.service";
import { PatchRequest } from "./patch-request.model";
import { WebOperationOptions } from "./web-operation-options.model";
import { PathService } from "../_shared/services/path.service";


/**
 * Helper service for making simple JSON web requests
 * For complicated scenarios, use Angular's HttpClient
 */
@Injectable({
  providedIn: "root"
})
export class WebOperation {

  // #region Constructor

  constructor(
    private _http: HttpClient,
    private _configurationService: ConfigurationService,
    private _pathService: PathService) {

  }

  // #endregion

  // #region Public Methods

  /**
   * Gets the resource from the specified url
   * @param relativeUrl The relative url of the resource
   * @param options? Additional options for the request [optional]
   * @returns An observable of the resource specified
   */
  public get<TResponseData>(relativeUrl: string, options: WebOperationOptions = {}): Observable<TResponseData> {

    const headers = options.headers;
    const url = this.buildUrl(relativeUrl, options);
    return this._http.get<TResponseData>(url, { headers });
  }

  /**
   * Posts the resource to the specified url
   * @param relativeUrl The relative url of the resource
   * @param postData The data to be posted
   * @param options? Additional options for the request [optional]
   * @returns An observable of the resource specified
   */
  public post<TResponseData>(relativeUrl: string, postData: any, options: WebOperationOptions = {}): Observable<TResponseData> {

    const headers = options.headers;
    const url = this.buildUrl(relativeUrl, options);
    return this._http.post<TResponseData>(url, postData, { headers });
  }

  /**
   * Puts the resource to the specified url
   * @param relativeUrl The relative url of the resource
   * @param putData The data to be put
   * @param options? Additional options for the request [optional]
   * @returns An observable of the resource specified
   */
  public put<TResponseData>(relativeUrl: string, putData: any, options: WebOperationOptions = {}): Observable<TResponseData> {

    const headers = options.headers;
    const url = this.buildUrl(relativeUrl, options);
    return this._http.put<TResponseData>(url, putData, { headers });
  }

  /**
   * Patches the resource at the specified url
   * @param relativeUrl The relative url of the resource
   * @param patchRequestData The data to be patched
   * @param options? Additional options for the request [optional]
   * @returns An observable of the resource specified
   */
  public patch<TResponseData>(
    relativeUrl: string, patchData: PatchRequest[],
    options: WebOperationOptions = {}): Observable<TResponseData> {

    const headers = options.headers;
    const url = this.buildUrl(relativeUrl, options);
    const patchRequest = this.buildPatchRequest(patchData);
    return this._http.patch<TResponseData>(url, patchRequest, { headers });
  }

  /**
   * Deletes the resource at the specified url
   * @param relativeUrl The relative url of the resource
   * @param options? Additional options for the request [optional]
   * @returns An observable of the resource specified
   */
  public delete<TResponseData>(relativeUrl: string, options: WebOperationOptions = {}): Observable<TResponseData> {

    const headers = options.headers;
    const url = this.buildUrl(relativeUrl, options);
    return this._http.delete<TResponseData>(url, { headers });
  }

  // #endregion

  // #region Private Methods

  private buildUrl(relativeUrl: string, options: WebOperationOptions): string {

    let baseUrl = options.baseUrl && options.baseUrl === "website" ?
      this._configurationService.baseWebsiteUrl : this._configurationService.baseWebServicesUrl;

    if (options.baseUrlOverride) {
      baseUrl = options.baseUrlOverride;
    }

    return this._pathService.join(baseUrl, relativeUrl);
  }

  private buildPatchRequest(patchData: PatchRequest[]): string {

      let request = "[";

      for (let i = 0; i < patchData.length; i++) {

          request += patchData[i].toJsonString();

          if (i !== patchData.length - 1) {
              request += ",";
          }
      }

      request += "]";

      return request;
  }

  // #endregion
}

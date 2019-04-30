import { Injectable } from "@angular/core";
import { isString } from "../functions/type-checking/is-string.function";

/**
 * Service that provides URL manipulation methods
 */
@Injectable({
  providedIn: "root"
})
export class UrlService {

  // #region Public Methods

  /**
   * Adds an additional query parameter to the url
   * @param url The url to alter
   * @param name The query parameter"s name
   * @param value The query parameter"s value
   * @returns The updated url
   */
  public addQueryParameter(url: string, name: string, value: string): string {

    if (!name || !value) {
      return url;
    }

    if (!url) {
      url = "";
    }

    return url.replace(/\/$/g, "")  + (url.indexOf("?") < 0 ? "?" : "&") + name + "=" + value;
  }

  /**
   * Finds the parts of the url's path
   *
   * @param url The url to search (e.g. "http://www.someurl.com/pathPart1/pathPart2" or "/pathPart1/pathPart2")
   * @returns An array representing the path's parts (e.g. ["pathPart1", "pathPart2"])
   */
  public findPathParts(url: string): string[] {

    let parts: string[] = [];

    if (isString(url) && url.length > 0) {

      if (url.includes("http://")) {

        url = url.replace("http://", "");
        parts = url.split("/").filter(v => v !== "");

        if (parts.length > 0) {
          parts.shift();
        }
      }
      else {
        parts = url.split("/").filter(v => v !== "");
      }
    }

    return parts;
  }

  /**
   * Returns a key/value dictionary of the query string parameters in the given url
   * @param url The url containing the query string (e.g. "?shape=square&color=purple")
   * @returns The key/value dictionary (e.g. { shape: "square", color: "purple"})
   */
  public findQueryParameters(url: string): { [parameterName: string]: string } {

    const params = {};

    if (url) {

      const urlParts = url.split("?");

      if (urlParts.length >= 2) {

        const pairs = urlParts[1].split(/[&;]/g);

        pairs.forEach(pair => {

          const p = pair.split("=");

          if (p.length === 2) {
            params[p[0]] = p[1];
          }
        });
      }
    }

    return params;
  }

  /**
   * Removes the query parameter from the given url
   * @param url The url containing the query parameter
   * @param parameterName The query parameter's name (e.g. "shape" for "?shape=square")
   * @returns The url without the query parameter
   */
  public removeQueryParameter(url: string, parameterName: string): string {

    let modifiedUrl = url;

    if (isString(url)) {

      const urlParts = url.split("?");

      if (urlParts.length >= 2) {

        const prefix = encodeURIComponent(parameterName) + "=";
        const pairs = urlParts[1].split(/[&;]/g);
        const length = pairs.length;

        for (let i = 0; i < length; i++) {
          if (pairs[i].startsWith(prefix)) {
            pairs.splice(i, 1);
            break;
          }
        }

        const questionMark = pairs.length > 0 ? "?" : "";
        modifiedUrl = `${urlParts[0]}${questionMark}${pairs.join("&")}`;
      }
    }

    return modifiedUrl;
  }

  // #endregion
}

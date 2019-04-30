import { HttpHeaders } from "@angular/common/http";

export interface WebOperationOptions {

  /**
   * Specifies additional http headers to include in the request
   */
  headers?: HttpHeaders;

  /**
   *  Indicates whether the web resource is on the web server (website) or a remote web service (web-service)
   *  [optional: defaults to "web-service"]
   */
  baseUrl?: "website" | "web-service";

  /**
   * Specifies a new base url that completely overrides the default (website and web-service) base urls
   */
  baseUrlOverride?: string;
}

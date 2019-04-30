import { Injectable } from "@angular/core";
import { isString } from "../functions/type-checking/is-string.function";

/**
 * Service that provides path manipulation methods
 */
@Injectable({
  providedIn: "root"
})
export class PathService {

  /**
   * Joins two paths together
   * @param path1 The first path (generally, this is the base path)
   * @param path2 The second path (generally, this is the relative path)
   * @returns The combined path
   */
  public join(path1: string, path2: string): string {

    path1 = this.removeTrailingSlash(path1);

    if (!path1) {
      return path2;
    }

    if (!path2) {
      return path1;
    }

    return `${this.removeTrailingSlash(path1.trim())}/${this.removeLeadingSlash(path2.trim())}`;
  }

  /**
   * Removes the trailing slash from the URL path
   * @param path The path
   * @returns The path without a trailing slash
   */
  public removeTrailingSlash(path: string): string {
    return isString(path) ? path.replace(/\/$/g, "") : null;
  }

  /**
   * Removes the leading slash from the URL path
   * @param path The path
   * @returns The path without the leading slash
   */
  public removeLeadingSlash(path: string): string {
    return isString(path) ? path.replace(/^\//g, "") : null;
  }

  /**
   * Finds the parts of the path
   *
   * @param path The path (e.g. "/pathPart1/pathPart2")
   * @returns The parts of the path (e.g. ["pathPart1", "pathPart2"])
   */
  public findParts(path: string): string[] {

    let parts = [];

    if (isString(path) && path.length > 0) {
      parts = path.split("/").filter(v => v !== "");
    }

    return parts;
  }

}

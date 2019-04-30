import { Injectable } from "@angular/core";
import { v4 as uuidV4 } from "uuid/v4";

/**
 * Service for generating guids
 */
@Injectable({
    providedIn: "root"
})
export class GuidService {

  /**
   * Generates a unique identifier (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX) with a very low chance of duplication
   */
  public create(): string {
    return uuidV4();
  }
}

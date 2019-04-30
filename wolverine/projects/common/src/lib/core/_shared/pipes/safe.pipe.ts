import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from "@angular/platform-browser";

/**
 * Safe pipe - indicates to the Angular framework that the string can be trusted
 * (i.e. it is not user-input text, or has been sanitized already)
 */
@Pipe({
    name: "safe"
})
export class SafePipe implements PipeTransform {

    // #region Constructor

    constructor(private _sanitizer: DomSanitizer) {

    }

    // #endregion

    // #region Public Methods

    public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

        switch (type) {

            case "html":
                return this._sanitizer.bypassSecurityTrustHtml(value);

            case "style":
                return this._sanitizer.bypassSecurityTrustStyle(value);

            case "script":
                return this._sanitizer.bypassSecurityTrustScript(value);

            case "url":
                return this._sanitizer.bypassSecurityTrustUrl(value);

            case "resourceUrl":
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);

            default:
                throw new Error(`Unable to bypass security for invalid type: ${type}`);
        }
    }

    // #endregion
}

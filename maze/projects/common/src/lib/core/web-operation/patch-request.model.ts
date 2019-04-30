import { PatchOperationType } from "./patch-operation-type.enum";

export class PatchRequest {

    // #region Constructor

    private constructor(
        private _operation: PatchOperationType,
        private _path?: string,
        private _from?: string,
        private _value?: any) {

    }

    // #endregion

    // #region Public Methods

    /**
     * Creates an "add" patch request
     * @param path - The path to the resource to add
     * @param value - The value of the resource
     * @returns The patch request model
     */
    public static add(path: string, value: any): PatchRequest {
        return new PatchRequest(PatchOperationType.Add, path, null, value);
    }

    /**
     * Creates a "copy" patch request
     * @param from - The location of the resource to copy
     * @param path - The path to the destination
     * @returns The patch request model
     */
    public static copy(from: string, path: string): PatchRequest {
        return new PatchRequest(PatchOperationType.Copy, path, from);
    }

    /**
     * Creates an "move" patch request
     * @param from - The location of the resource to move
     * @param path - The path to the destination
     * @returns The patch request model
     */
    public static move(from: string, path: string): PatchRequest {
        return new PatchRequest(PatchOperationType.Move, path, from);
    }

    /**
     * Creates a "remove" patch request
     * @param path - The path to the resource to remove
     * @returns The patch request model
     */
    public static remove(path: string): PatchRequest {
        return new PatchRequest(PatchOperationType.Remove, path);
    }

    /**
     * Creates an "replace" patch request
     * @param path - The path to the resource to replace
     * @param value - The new value of the resource
     * @returns The patch request model
     */
    public static replace(path: string, value: any): PatchRequest {
        return new PatchRequest(PatchOperationType.Replace, path, null, value);
    }

    /**
     * Creates a "test" patch request
     * @param path - The path to the resource to test
     * @param value - The value of the resource
     * @returns The patch request model
     */
    public static test(path: string, value: any): PatchRequest {
        return new PatchRequest(PatchOperationType.Test, path, null, value);
    }

    /**
     * Creates the JSON string for the patch request
     * @returns The JSON string representation of this request
     */
    public toJsonString(): string {

        const request = {};

        request["op"] = this._operation;
        request["path"] = this._path;

        if (this._from) {
            request["from"] = this._from;
        }

        if (this._value) {
            request["value"] = this._value;
        }

        return JSON.stringify(request);
    }

    // #endregion
}

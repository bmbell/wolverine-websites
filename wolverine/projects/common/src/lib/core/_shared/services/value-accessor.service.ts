import { Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

export abstract class ValueAccessor implements ControlValueAccessor {

    // #region Private Fields

    private _value: any;

    // #endregion

    // #region Constructor

    constructor() {
        this.onChange = () => {};
        this.onTouched = () => {};
    }

    // #endregion

    // #region Public Events

    public onChange: (c: any) => void;
    public onTouched: () => void;

    // #endregion

    // #region Public Properties

    public get value(): any {
        return this._value;
    }

    @Input()
    public set value(v: any) {

        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    // #endregion

    // #region Public Methods

    public writeValue(value: any): void {
        if (this._value !== value) {
            this._value = value;
        }
    }

    public registerOnChange(func: (c: any) => void): void {
        this.onChange = func;
    }

    public registerOnTouched(func: () => void): void {
        this.onTouched = func;
    }

    // #endregion
}

import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[bellTrackScroll]"
})
export class TrackScrollDirective {

    constructor() {
        this.scrollPosition = new EventEmitter<number>();
    }

    @Output()
    public scrollPosition: EventEmitter<number>;

    @HostListener("scroll", ["$event"])
    public trackScrollEvent(event: Event) {
        this.scrollPosition.emit(event.srcElement.scrollTop);
    }
}

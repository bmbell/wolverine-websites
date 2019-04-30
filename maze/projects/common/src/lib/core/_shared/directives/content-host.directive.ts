import { ViewContainerRef, Directive } from "@angular/core";

@Directive({
  selector: "[bellContentHost]"
})
export class ContentHostDirective {

  public constructor(public viewContainerRef: ViewContainerRef) {

  }
}

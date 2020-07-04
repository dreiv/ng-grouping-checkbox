import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[selectGroup]'
})
export class SelectGroupDirective {
  checkChanges$ = fromEvent(this.host.nativeElement, 'change').pipe(
    map((e) => (e.target as any).checked)
  );

  constructor(private host: ElementRef<HTMLInputElement>) {}

  set checked(value: boolean) {
    this.host.nativeElement.checked = value;
  }

  set indeterminate(value: boolean) {
    this.host.nativeElement.indeterminate = value;
  }
}

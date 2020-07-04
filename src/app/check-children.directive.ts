import {
  Directive,
  QueryList,
  ContentChildren,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { merge } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { SelectGroupDirective } from './select-group.directive';
import { debounceTime } from 'rxjs/operators';

@UntilDestroy()
@Directive({
  selector: '[checkChildren]'
})
export class CheckChildrenDirective implements AfterContentInit {
  @ContentChildren(NgControl, { descendants: true })
  controls!: QueryList<NgControl>;
  @ContentChild(SelectGroupDirective)
  selectGroup!: SelectGroupDirective;

  ngAfterContentInit(): void {
    this.selectGroup.checkChanges$
      .pipe(untilDestroyed(this))
      .subscribe((checked) => {
        this.controls.forEach(({ control }) => control?.patchValue(checked));
      });

    const changes = this.controls.map(
      ({ control }) => (control as AbstractControl).valueChanges
    );

    merge(...changes)
      .pipe(untilDestroyed(this), debounceTime(0))
      .subscribe(() => {
        const controls = this.controls.toArray();

        const every = controls.every(({ control }) => control?.value);
        const some = controls.some(({ control }) => control?.value);

        this.selectGroup.checked = every;
        this.selectGroup.indeterminate = !every && every !== some;
      });
  }
}

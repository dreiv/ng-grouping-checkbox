import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreePipe } from './tree.pipe';
import { CheckChildrenDirective } from './check-children.directive';
import { SelectGroupDirective } from './select-group.directive';

@NgModule({
  declarations: [
    AppComponent,
    TreePipe,
    CheckChildrenDirective,
    SelectGroupDirective
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  items = [
    { name: 'One', id: 1, group: 'A' },
    { name: 'Two', id: 2, group: 'A' },
    { name: 'Three', id: 3, group: 'A' },
    { name: 'Four', id: 4, group: 'B' },
    { name: 'Five', id: 5, group: 'B' },
    { name: 'Six', id: 6, group: 'B' }
  ];

  form = new FormGroup({
    items: new FormArray([])
  });

  ngOnInit(): void {
    this.items.forEach(() => this.control.push(new FormControl()));
  }

  get control(): FormArray {
    return this.form.get('items') as FormArray;
  }
}

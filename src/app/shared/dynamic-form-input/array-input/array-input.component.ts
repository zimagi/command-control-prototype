import { Component, Input, OnInit } from '@angular/core';

declare const getUID: any;
declare const document: any;
@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
})
export class ArrayInputComponent implements OnInit {
  @Input() name!: string;
  @Input() type!: string;
  list: any[] = [];
  initialInpt!: string;
  constructor() {}

  ngOnInit(): void {
    this.initialInpt = this.name + '_' + getUID();
    this.list.push({ name: this.initialInpt });
  }
  addInput() {
    const id = this.name + '_' + getUID();
    this.list.push({ name: id });
    setTimeout(() => {
      if (this.type == 'object') {
        document.getElementById('key-' + id).focus();
      } else {
        document.getElementById(id).focus();
      }
    }, 500);
  }
  removeInput(id: string) {
    const indexOfObject = this.list.findIndex((object) => {
      return object.name === id;
    });
    this.list.splice(indexOfObject, 1);
  }
}

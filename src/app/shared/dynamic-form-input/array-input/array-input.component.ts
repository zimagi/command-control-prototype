import { Component, Input, OnInit } from '@angular/core';

declare const getUID: any;
@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
})
export class ArrayInputComponent implements OnInit {
  @Input() name!: string | '';
  list: any[] = [];
  initialInpt!: string;
  constructor() {}

  ngOnInit(): void {
    this.initialInpt = this.name + '_' + getUID();
    this.list.push({ name: this.initialInpt });
  }
  addInput() {
    this.list.push({ name: this.name + '_' + getUID() });
  }
  removeInput(id: string) {
    // if (this.list.length > 1) {
    //   return this.list.filter((ele) => {
    //     return ele != id;
    //   });
    // }
    const indexOfObject = this.list.findIndex((object) => {
      return object.name === id;
    });

    this.list.splice(indexOfObject, 1);
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  id: any;
  @Input()
  data: any[] = [];
  @Input() accordionLabel: string = '';
  @Input() addBtnLabel: string = '';
  @Input() path = '';
  commands: any[] = [];

  constructor() {}

  ngOnInit() {
    // Generate a unique id for the accordion
    this.id = Math.random().toString(36).substr(2, 9);
  }
  getKey(item: any) {
    return Object.keys(item);
    console.log(Object.keys(item));
  }
  cLog(item: any) {
    console.log(item);
  }
  getType(item: any) {
    console.log(typeof item);
  }
  addCommand(item: any) {
    this.commands.push(item);
    console.log(this.commands);
  }
}

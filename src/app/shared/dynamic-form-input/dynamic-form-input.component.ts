import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/form-field';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent {
  @Input()
  controlType!: string;
  @Input()
  key!: string;
  @Input()
  desc!: string;
  @Input()
  name!: string;
  @Input()
  label!: string;
  @Input()
  validator!: string;
  @Input()
  pHolder!: string;
  @Input()
  required!: boolean;
  @Input()
  value!: boolean;
  constructor() {}
  setDescription(desc: string, required: boolean) {
    let result = desc.replace('(comma separated)', '');
    if (required == true) {
      result += ' <span class="text-danger">*</span>';
    }
    return result;
  }
}

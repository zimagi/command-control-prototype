import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { FormField } from 'src/app/form-field';
import { FormfieldControlService } from 'src/app/formfield-control.service';

declare const $: any;

@Component({
  selector: 'app-edit-command2',
  templateUrl: './edit-command2.component.html',
  styleUrls: ['./edit-command2.component.scss'],
})
export class EditCommand2Component {
  formFields: Observable<FormField<any>[]>;
  constructor(service: FormfieldControlService) {
    this.formFields = service.getFormFields();
  }
}

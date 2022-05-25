import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
declare const $: any;
declare const getFormData: any;
declare const initIntegerFields: any;
declare const validateForm: any;
declare const setFormErrorMessages: any;
declare const resetFormErrorMessages: any;
@Component({
  selector: 'app-edit-command-new',
  templateUrl: './edit-command-new.component.html',
  styleUrls: ['./edit-command-new.component.scss'],
})
export class EditCommandNewComponent implements OnInit {
  dataCommands: any = [];
  commandName: any = '';
  actionName: any = '';
  action: any = {};
  acceptedKeys: any[] = ['url'];
  api: any;
  // authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  form!: FormGroup;
  // form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.api = this.appService.url;
    if (this.appService.commandsList.length === 0) {
      this.appService.getAllCommands().subscribe((data: any) => {
        this.route.paramMap.subscribe((params) => {
          this.commandName = params.get('command');
          this.actionName = params.get('action');

          setTimeout(() => {
            this.resetScroll();
          }, 100);
        });
        this.appService.commandsList = data;
        this.dataCommands = this.appService.commandsList;

        // console.log('---');
        // console.log(this.dataCommands);
        // console.log('---');
        this.getCommandDetails(this.commandName);
      });
    } else {
      this.route.paramMap.subscribe((params) => {
        this.commandName = params.get('command');
        this.actionName = params.get('action');

        setTimeout(() => {
          this.resetScroll();
        }, 100);
      });
      this.dataCommands = this.appService.commandsList;
      this.getCommandDetails(this.commandName);
    }
  }

  ngAfterViewInit() {
    // Sort fields by required
    // setTimeout(() => {
    //   $('#inpt-fields').html(
    //     $('#inpt-fields .div-req').sort(this.appService.sortByRequired)
    //   );
    // }, 500);
    // Init integer fields
    setTimeout(() => {
      initIntegerFields();
    }, 500);
  }

  formatBreadcrumbs(str: string) {
    let result = '';
    if (str != null || str != undefined) {
      result = str.replace(/:/g, '/');
    }
    return result;
  }

  resetScroll() {
    $('#scroll-win').css('height', window.innerHeight - 190 + 'px');
    $(window).resize(function () {
      $('#scroll-win').css('height', window.innerHeight - 190 + 'px');
    });
    $('#begin').hide();
    $('#scroll-win').scrollTop(0);
  }

  getKey(item: any) {
    return Object.keys(item);
  }

  getActionDetails(obj: any) {
    // console.log('-- getActionDetails --');
    // console.log(obj);
    // console.log('-- getActionDetails --');
    if (this.actionName === null) {
      if (obj != undefined || obj != null) {
        this.action = obj;
        this.action.fields.sort(this.appService.sortByReq);
      }
    } else {
      for (let [key, value] of Object.entries(obj)) {
        // console.log(key);
        if (key == this.actionName) {
          // console.log(value);
          this.action = value;
          this.action.fields.sort(this.appService.sortByReq);
        }
      }
    }
    // Initialize de formControls
    // let fields = [];
    // for (let item of this.action.fields) {
    //   fields.push({ [item.name]: '' });
    // }
    // console.log(fields);
    // this.form = this.fb.group({ dataset_name: 'tttt' });
  }

  // toFormGroup(inputs: <string>[]): FormGroup {
  //   const group: any = {};
  //   inputs.forEach(input => {
  //     let validator: ValidatorFn[] = input.required ? [Validators.required] : [];
  //     switch (input.validator) {
  //       case "email":
  //         validator.push(Validators.email);
  //         break;
  //       default:
  //         break;
  //     }
  //     group[input.key] = validator.length > 0 ? new FormControl(input.value || '', validator)
  //                                       : new FormControl(input.value || '');
  //   });

  //   return new FormGroup(group);
  // }

  isObject(value: any): any {
    return !!(value && typeof value === 'object' && !Array.isArray(value));
  }

  findNestedObject(obj: any, keyToMatch = '') {
    if (this.isObject(obj)) {
      const entries = Object.entries(obj);
      for (let i = 0; i < entries.length; i += 1) {
        const [objectKey, objectValue] = entries[i];
        if (objectKey === keyToMatch) {
          return obj;
        }

        if (this.isObject(objectValue)) {
          const child: any = this.findNestedObject(objectValue, keyToMatch);

          if (child !== null) {
            return child;
          }
        }
      }
    }

    return null;
  }

  getCommandDetails(name: string) {
    // console.log('> ' + name);
    const keysArr = name.split(':');
    const len = keysArr.length;
    let lastKey = keysArr[len - 1];
    let command: any = [];
    let lastKeyParent = '';

    for (let [key, value] of Object.entries(this.dataCommands)) {
      if (keysArr[0] == key) {
        command = value;
      }
    }
    if (keysArr.length == 1) {
      lastKey = name;
      lastKeyParent = command;
    } else {
      lastKeyParent = this.findNestedObject(command, lastKey);
    }

    // console.log(command);
    // console.log('last = ' + keysArr[len - 1]);
    // console.log(this.isObject(lastKeyParent));
    if (!this.isObject(lastKeyParent) || keysArr.length == 1) {
      this.getActionDetails(lastKeyParent);
    } else {
      // is object array
      for (let [key, value] of Object.entries(lastKeyParent)) {
        if (lastKey == key) {
          // console.log(value);
          this.getActionDetails(value);
        }
      }
    }
  }

  keyInArray(ele: any): boolean {
    if (this.acceptedKeys.includes(ele)) {
      // console.log(ele + ': ' + true);
      return true;
    }
    // console.log(ele + ': ' + false);
    return false;
  }

  // getSchema(obj: any) {
  //   let result: string = '';
  //   for (let [key, value] of Object.entries(obj)) {
  //     // console.log(`${key}: ${value}`);
  //     result +=
  //       '<div class="mb-3 row mt-3"><label for="name" class="col-sm-3 col-form-label text-right">' +
  //       key +
  //       '</label><div class="col-sm-9"><input type="text" class="form-control" value="' +
  //       value +
  //       '" /></div></div>';
  //   }
  //   // console.log(result);
  //   return this._sanitizer.bypassSecurityTrustHtml(result);
  // }

  getDefaultValue(val: any) {
    return val.substring(val.indexOf('<') + 1, val.lastIndexOf('>'));
  }

  getDatePlaceholder(val: any) {
    if (val.indexOf('YYYY-MM-DD HH:MM:SS') > -1) {
      return 'YYYY-MM-DD HH:MM:SS';
    }
    return '';
  }

  // returnInputHtml(name: any, type: any, title: any, desc: any, req: boolean) {
  //   let result: string = '';
  //   // let n: number = Math.floor(Math.random() * 500) + 1;
  //   let valueDefault: any = this.getDefaultValue(desc);
  //   let datePlaceholder: any = this.getDatePlaceholder(desc);
  //   let required = req ? '<span class="text-danger">*</span>' : '';
  //   let requiredBadge = req
  //     ? ' <span class="badge bg-danger d-inline-block text-uppercase">required</span>'
  //     : '';
  //   let requiredInp = req ? 'required' : '';
  //   switch (type) {
  //     case 'integer':
  //       result =
  //         '<div class="pb-2">' +
  //         desc +
  //         required +
  //         '</div><input id="' +
  //         name +
  //         '" name="' +
  //         name +
  //         '" type="text" class="form-control numeric" onkeypress="return isNumberKey(event,this.id)"  value="' +
  //         valueDefault +
  //         '"/><div><span class="badge bg-secondary d-inline-block text-uppercase">integer</span></div>';
  //       break;
  //     case 'string':
  //       result =
  //         '<div class="pb-2">' +
  //         desc +
  //         required +
  //         '</div><input id="' +
  //         name +
  //         '" name="' +
  //         name +
  //         '" type="text" class="form-control" value="" placeholder="' +
  //         datePlaceholder +
  //         '" ' +
  //         requiredInp +
  //         '/><div><span class="badge bg-secondary d-inline-block text-uppercase">string</span>' +
  //         requiredBadge +
  //         '</div>';
  //       break;
  //     case 'array':
  //       result =
  //         '<div class="pb-2">' +
  //         desc.replace('(comma separated)', '') +
  //         required +
  //         '</div><div id="' +
  //         name +
  //         '_arr" class="col"><ul class="list-group arr-' +
  //         name +
  //         '"><li class="list-group-item d-flex bd-highlight align-items-center"><input id="' +
  //         name +
  //         '" name="' +
  //         name +
  //         '" type="text" class="form-control flex-grow-1 bd-highlight arr-inpt" /><span class="d-inline-block" style="width: 40px;"></span></li></ul><a href="javascript://" onClick="addArrayItem(\'' +
  //         name.trim() +
  //         "_arr', '" +
  //         name.trim() +
  //         '\')" class="btn btn-primary btn-sm my-3">+ Add</a></div>';

  //       break;
  //     case 'object':
  //       result =
  //         '<div class="pb-2">' +
  //         desc +
  //         required +
  //         '</div><div id="' +
  //         name +
  //         '_obj" class="col"><ul class="list-group obj-' +
  //         name +
  //         '"><li class="list-group-item d-flex bd-highlight align-items-center"><div class="col-5"><label class="form-label">Key</label><input type="text" name="key-' +
  //         name +
  //         '" class="form-control bd-highlight obj-key obj-inpt" /></div><div class="col-1 d-flex justify-content-center align-items-center"><span class="mt-4">=</span></div><div class="col-5"><label class="form-label">Value</label><input name="' +
  //         name +
  //         '" type="text" class="form-control bd-highlight obj-value obj-inpt" /></div><div class="col-1"><span class="d-inline-block" style="width: 40px;"></span></div></li></ul><a href="javascript://" onClick="addObjItem(\'' +
  //         name.trim() +
  //         "_obj', '" +
  //         name.trim() +
  //         '\')" class="btn btn-primary btn-sm my-3">+ Add</a></div>';
  //       break;
  //     case 'boolean':
  //       result =
  //         '<div class="pb-2">' +
  //         desc +
  //         required +
  //         '</div><div class="form-check"><input class="form-check-input" id="radio1-' +
  //         name +
  //         '" type="radio" checked name="' +
  //         name +
  //         '"><label class="form-check-label" for="radio1-' +
  //         title +
  //         '">false</label></div><div class="form-check"><input class="form-check-input" id="radio2-' +
  //         name +
  //         '" type="radio" name="' +
  //         name +
  //         '" ><label class="form-check-label" for="radio2-' +
  //         title +
  //         '">true</label></div>';
  //       break;
  //   }

  //   return this._sanitizer.bypassSecurityTrustHtml(result);
  // }

  executeCommand() {
    // Validate required fields
    if (validateForm() == false) {
      setFormErrorMessages();
      return;
    }
    resetFormErrorMessages();

    let frmData = getFormData('frm-command');
    let intArr: any;
    let arr = this.appService.responses;
    let command = this.formatBreadcrumbs(this.commandName);
    let dataResponse: any;
    // console.log(this.formatBreadcrumbs(this.commandName));
    // if (this.actionName === null) {
    //   this.actionName = '';
    // } else {
    arr.push({
      action: this.formatBreadcrumbs(this.commandName),
      formData: frmData.fields,
    });

    this.appService.responses = arr;
    // console.log(frmData.fields);
    // console.log(this.appService.responses);
    // }
    // console.log('https://demo.zimagi.com:5123/' + command);
    // $.ajax({
    //   method: 'POST',
    //   url: this.appService.url + command,
    //   data: frmData.fields,
    //   beforeSend: function (xhr: any) {
    //     xhr.setRequestHeader(
    //       'Authorization',
    //       'Token ' + this.appService.user + ' ' + this.appService.token
    //     );
    //   },
    //   processData: true,
    //   complete: function (msg: any) {
    //     dataResponse = msg.responseText;
    //   },
    // });
    // intArr = setInterval(() => {
    //   if (dataResponse != undefined) {
    //     clearInterval(intArr);
    //     $('#btn-execute').attr('disabled', true);
    //     $('#btn-execute').css('opacity', '.5');
    //     console.log(dataResponse);
    //   }
    // }, 500);

    // console.log('----');
    // console.log(arr);
    // console.log('----');
    // return;
    // this.http
    //   .post<any[]>(
    //     this.api + command,
    //     {},
    //     {
    //       headers: new HttpHeaders({
    //         Authorization: this.authHead,
    //       }),
    //     }
    //   )
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
    // this.appService.executeCommand(command).subscribe((data: any) => {
    //   console.log(data);
    // });
    //this.appService.responses = arr;
    // Disable execute button
    $('#btn-execute').attr('disabled', true);
    $('#btn-execute').css('opacity', '.5');
  }
}

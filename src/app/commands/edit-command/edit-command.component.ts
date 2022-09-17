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
import { Observable, throwError, of, from } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
declare const $: any;
declare const getFormData: any;
declare const initIntegerFields: any;
declare const validateForm: any;
declare const setFormErrorMessages: any;
declare const resetFormErrorMessages: any;
declare const abortFetchExecution: any;
@Component({
  selector: 'app-edit-command-new',
  templateUrl: './edit-command.component.html',
  styleUrls: ['./edit-command.component.scss'],
})
export class EditCommandComponent implements OnInit {
  dataCommands: any = [];
  commandName: any = '';
  actionName: any = '';
  action: any = {};
  acceptedKeys: any[] = ['url'];
  api: any;
  // authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  form!: FormGroup;
  resultsArr: any = [];
  commandsObs$: Observable<any[]> | undefined;
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

    this.commandsObs$ = this.appService.getCommandStream();
  }

  ngAfterViewInit() {
    // Sort fields by required

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
        if (this.action.fields) {
          this.action.fields.sort(this.appService.sortByReq);
        }
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
  }

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

  stopExecution() {
    abortFetchExecution();
  }

  getDefaultValue(val: any) {
    return val.substring(val.indexOf('<') + 1, val.lastIndexOf('>'));
  }

  getDatePlaceholder(val: any) {
    if (val.indexOf('YYYY-MM-DD HH:MM:SS') > -1) {
      return 'YYYY-MM-DD HH:MM:SS';
    }
    return '';
  }

  executeCommand() {
    // Validate required fields
    if (validateForm() == false) {
      setFormErrorMessages();
      return;
    }
    resetFormErrorMessages();

    let frmData = getFormData('frm-command');

    $('#btn-abort').removeClass('d-none');

    let intArr: any;
    let arr = this.appService.responses;
    let command = this.formatBreadcrumbs(this.commandName);
    let dataResponse: any;

    arr.push({
      action: this.formatBreadcrumbs(this.commandName),
      formData: frmData.fields,
    });

    this.appService.responses = arr;

    // Disable execute button
    $('#btn-execute').attr('disabled', true);
    $('#btn-execute').css('opacity', '.5');
  }
}

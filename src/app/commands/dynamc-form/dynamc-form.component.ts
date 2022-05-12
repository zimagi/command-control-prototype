import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormField } from 'src/app/form-field';
import { FormfieldControlService } from 'src/app/formfield-control.service';
declare const $: any;
@Component({
  selector: 'app-dynamc-form',
  templateUrl: './dynamc-form.component.html',
  styleUrls: ['./dynamc-form.component.scss'],
})
export class DynamcFormComponent implements OnInit {
  @Input() data: FormField<string>[] = [];
  form!: FormGroup;
  payLoad = ' ';
  /////

  dataCommands: any = [];
  commandName: any = '';
  actionName: any = '';
  action: any = {};
  acceptedKeys: any[] = ['url'];
  api: any;
  authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  constructor(
    private formfieldService: FormfieldControlService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.data);

    /////
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

  getActionDetails(obj: any) {
    // console.log('-- getActionDetails --');
    // console.log(obj);
    // console.log('-- getActionDetails --');
    if (this.actionName === null) {
      if (obj != undefined || obj != null) {
        this.action = obj;
      }
    } else {
      for (let [key, value] of Object.entries(obj)) {
        // console.log(key);
        if (key == this.actionName) {
          // console.log(value);
          this.action = value;
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

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}

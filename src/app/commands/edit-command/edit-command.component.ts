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
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
declare const $: any;
@Component({
  selector: 'app-edit-command',
  templateUrl: './edit-command.component.html',
  styleUrls: ['./edit-command.component.scss'],
})
export class EditCommandComponent implements OnInit {
  allCommands: any = [];
  commandName: any = '';
  actionName: any = '';
  action: any = {};
  acceptedKeys: any[] = ['url'];
  @Output() emitAddResponse: EventEmitter<any> = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.allCommands = this.appService.getCommands();
    this.route.paramMap.subscribe((params) => {
      this.commandName = params.get('command');
      this.actionName = params.get('action');
      this.getCommandDetails(this.commandName);
      setTimeout(() => {
        this.resetScroll();
      }, 100);
    });
  }

  formatBreadcrumbs(str: string) {
    let result = '';

    if (str != null || str != undefined) {
      result = str.replace('-', '/');
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
    if (this.actionName === null) {
      this.action = obj;
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
    //console.log(name);
    const keysArr = name.split('-');
    const len = keysArr.length;
    let lastKey = keysArr[len - 1];
    let command: any = [];
    for (let [key, value] of Object.entries(this.allCommands[0])) {
      if (keysArr[0] == key) {
        // console.log(value);
        command = value;
      }
    }
    // console.log(command);
    // console.log('last = ' + keysArr[len - 1]);

    const lastKeyParent = this.findNestedObject(command, lastKey);
    // console.log(this.findNestedObject(lastKeyParent, lastKey));
    // console.log(this.isObject(lastKeyParent));
    if (!this.isObject(lastKeyParent)) {
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

  getSchema(obj: any) {
    let result: string = '';
    for (let [key, value] of Object.entries(obj)) {
      // console.log(`${key}: ${value}`);
      result +=
        '<div class="mb-3 row mt-3"><label for="name" class="col-sm-3 col-form-label text-right">' +
        key +
        '</label><div class="col-sm-9"><input type="text" class="form-control" value="' +
        value +
        '" /></div></div>';
    }
    // console.log(result);
    return this._sanitizer.bypassSecurityTrustHtml(result);
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

  returnInputHtml(name: any, type: any, title: any, desc: any) {
    let result: string = '';
    // let n: number = Math.floor(Math.random() * 500) + 1;
    let valueDefault: any = this.getDefaultValue(desc);
    let datePlaceholder: any = this.getDatePlaceholder(desc);
    switch (type) {
      case 'integer':
        result =
          '<div class="pb-2">' +
          desc +
          '</div><input type="text" class="form-control" value="' +
          valueDefault +
          '"/><div><span class="badge bg-secondary d-inline-block text-uppercase">integer</span></div>';
        break;
      case 'string':
        result =
          '<div class="pb-2">' +
          desc +
          '</div><input type="text" class="form-control" value="" placeholder="' +
          datePlaceholder +
          '"/><div><span class="badge bg-secondary d-inline-block text-uppercase">string</span></div>';
        break;
      case 'array':
        result =
          '<div class="pb-2">' +
          desc.replace('(comma separated)', '') +
          '</div><div id="' +
          name +
          '_arr" class="col"><ul class="list-group"><li class="list-group-item d-flex bd-highlight align-items-center"><input type="text" class="form-control flex-grow-1 bd-highlight" /><span class="d-inline-block" style="width: 40px;"></span></li></ul><a href="javascript://" onClick="addArrayItem(\'' +
          name.trim() +
          '_arr\')" class="btn btn-primary btn-sm my-3">+ Add</a></div>';

        break;
      case 'object':
        result =
          '<div class="pb-2">' +
          desc +
          '</div><div id="' +
          name +
          '_obj" class="col"><ul class="list-group"><li class="list-group-item d-flex bd-highlight align-items-center"><div class="col-5"><label class="form-label">Key</label><input type="text" class="form-control bd-highlight" /></div><div class="col-1 d-flex justify-content-center align-items-center"><span class="mt-4">=</span></div><div class="col-5"><label class="form-label">Value</label><input type="text" class="form-control bd-highlight" /></div><div class="col-1"><span class="d-inline-block" style="width: 40px;"></span></div></li></ul><a href="javascript://" onClick="addObjItem(\'' +
          name.trim() +
          '_obj\')" class="btn btn-primary btn-sm my-3">+ Add</a></div>';
        break;
      case 'boolean':
        result =
          '<div class="pb-2">' +
          desc +
          '</div><div class="form-check"><input class="form-check-input" type="radio" checked name="' +
          title +
          '"><label class="form-check-label" for="radio1-' +
          title +
          '">false</label></div><div class="form-check"><input class="form-check-input" type="radio" name="' +
          title +
          '" ><label class="form-check-label" for="radio2-' +
          title +
          '">true</label></div>';
        break;
    }
    // result +=
    //   '<div class="mb-3 row mt-3"><label for="name" class="col-sm-3 col-form-label text-right">' +
    //   key +
    //   '</label><div class="col-sm-9"><input type="text" class="form-control" value="' +
    //   value +
    //   '" /></div></div>';

    // console.log(result);
    return this._sanitizer.bypassSecurityTrustHtml(result);
  }

  addResponse() {
    // console.log('emit');
    // this.emitAddResponse.emit('clicked');
    let arr = this.appService.responses;
    if (this.actionName === null) {
      this.actionName = '';
    } else {
      arr.push({ action: this.commandName + ' ' + this.actionName });
    }

    this.appService.responses = arr;
    // Disable execute button
    $('#btn-execute').attr('disabled', true);
    $('#btn-execute').css('opacity', '.5');

    // Show overlay
    // $('#overlay').addClass('show');
  }
}
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
function findVal(arg0: any, key: any): any {
  throw new Error('Function not implemented.');
}

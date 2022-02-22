import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  actionName: any = 'rotate';
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
    $('#scroll-win').css('height', window.innerHeight - 190 + 'px');
    $(window).resize(function () {
      $('#scroll-win').css('height', window.innerHeight - 190 + 'px');
    });
    $('#begin').hide();
    this.allCommands = this.appService.getCommands();
    this.route.paramMap.subscribe((params) => {
      this.commandName = params.get('command');
      this.actionName = params.get('action');
      this.getCommandDetails(this.commandName);
    });
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
  getCommandDetails(name: string) {
    for (let [key, value] of Object.entries(this.allCommands[0])) {
      if (name == key) {
        // console.log(value);
        this.getActionDetails(value);
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
  returnInputHtml(type: any, title: any, desc: any) {
    let result: string = '';
    // let n: number = Math.floor(Math.random() * 500) + 1;
    let valueDefault: any = this.getDefaultValue(desc);
    switch (type) {
      case 'integer':
        result =
          '<input type="text" class="form-control" value="' +
          valueDefault +
          '"/><div><span class="badge bg-secondary d-inline-block text-uppercase">integer</span><div class="mt-2">' +
          desc +
          '<div></div>';
        break;
      case 'string':
        result =
          '<input type="text" class="form-control" value=""/><div><span class="badge bg-secondary d-inline-block text-uppercase">string</span><div class="mt-2">' +
          desc +
          '<div></div>';
        break;
      case 'array':
        result =
          '<input type="text" class="form-control" value=""/><div><span class="badge bg-secondary d-inline-block text-uppercase">array</span><div class="mt-2">' +
          desc +
          '<div></div>';
        break;
      case 'boolean':
        result =
          '<div class="form-check"><input class="form-check-input" type="radio" checked name="' +
          title +
          '"><label class="form-check-label" for="radio1-' +
          title +
          '">false</label></div><div class="form-check"><input class="form-check-input" type="radio" name="' +
          title +
          '" ><label class="form-check-label" for="radio2-' +
          title +
          '">true</label></div><div class="mt-3">' +
          desc +
          '</div>';
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

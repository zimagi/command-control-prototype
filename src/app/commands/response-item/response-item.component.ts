import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { Data } from 'popper.js';
declare let $: any;
declare let submitFetchAPI: any;
declare let dataResponse: any;
declare let dataComplete: any;
declare let abortExecution: any;
@Component({
  selector: 'app-response-item',
  templateUrl: './response-item.component.html',
  styleUrls: ['./response-item.component.scss'],
})
export class ResponseItemComponent implements OnInit {
  @Input() action: string = '';
  @Input() formData: any = [];
  @Input() loader: boolean = false;
  result: boolean = true;
  // loader: boolean = false;
  myDate = new Date();
  timeNow: any;
  formatedDate: any;
  defaultColor: boolean = false;
  data: any = [];
  infoDataMessageTypeOnly: boolean = false;
  dataComplete = false;
  abortExecution = false;
  months: any[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(
    private _sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.myDate = new Date();
    this.timeNow = new Date();
    this.formatedDate =
      this.myDate.getDate() +
      '/' +
      this.months[this.myDate.getMonth()] +
      '/' +
      this.myDate.getFullYear();

    let intArr: any;
    let url = this.appService.url;
    let user = this.appService.user;
    let token = this.appService.token;
    let method = 'POST';
    //console.log(url);
    //console.log('submitted');
    // this.appService
    //   .executeCommand(this.action, this.formData)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
    if (this.action === 'status') {
      method = 'GET';
    }
    console.log(method);
    console.log(url + this.action);
    console.log(this.formData);

    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Token ' + user + ' ' + token,
    };
    // Reset component dataComplete
    this.dataComplete = false;
    submitFetchAPI(headers, url + this.action, this.formData);

    // let last_response_len = false;
    // $.ajax({
    //   method: method,
    //   url: url + this.action,
    //   data: this.formData,
    //   beforeSend: function (xhr: any) {
    //     xhr.setRequestHeader('Authorization', 'Token ' + user + ' ' + token);
    //   },
    //   xhrFields: {
    //     onprogress: function (e: any) {
    //       var this_response,
    //         response = e.currentTarget.response;
    //       if (last_response_len === false) {
    //         this_response = response;
    //         last_response_len = response.length;
    //       } else {
    //         this_response = response.substring(last_response_len);
    //         last_response_len = response.length;
    //       }
    //       console.log(this_response);
    //     },
    //   },
    // })
    //   .done(function (data: any) {
    //     console.log('Complete response = ' + data);
    //   })
    //   .fail(function (err: any) {
    //     console.log('Error: ', err);
    //   });

    // $.ajax({
    //   method: method,
    //   url: url + this.action,
    //   data: this.formData,
    //   beforeSend: function (xhr: any) {
    //     xhr.setRequestHeader('Authorization', 'Token ' + user + ' ' + token);
    //   },
    //   processData: true,
    //   complete: function (msg: any) {
    //     dataResponse = msg.responseText;
    //   },
    //   fail: function (err: any) {
    //     console.log(err);
    //   },
    // });
    //*
    intArr = setInterval(() => {
      $('#btn-execute').attr('disabled', true);
      $('#btn-execute').css('opacity', '.5');
      this.abortExecution = abortExecution;
      if (dataResponse != undefined) {
        // console.log(dataResponse);
        dataResponse = dataResponse.trim();
        let jsn = this.remove_crlf(dataResponse);
        // console.log(JSON.parse('[' + jsn + ']'));
        // Convert all packages into one json
        // this.data = JSON.parse('[' + jsn + ']');
        // console.log('----------------');
        // console.log(jsn);
        // console.log('----------------');

        this.infoPackagesToJson(JSON.parse('[' + jsn + ']'));
      }
      if (dataComplete == true || this.abortExecution === true) {
        clearInterval(intArr);
        this.dataComplete = true;
        this.loader = false;
        // Enable execute button
        $('#btn-execute').attr('disabled', false);
        $('#btn-execute').css('opacity', '1');
      }
    }, 500);
    // */

    // $.ajax({
    //   method: 'POST',
    //   url: 'https://demo.zimagi.com:5123/' + this.action,
    //   beforeSend: function (xhr: any) {
    //     xhr.setRequestHeader(
    //       'Authorization',
    //       'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3'
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
    //     dataResponse = dataResponse.trim();
    //     let jsn = this.remove_crlf(dataResponse);
    //     // console.log(JSON.parse('[' + jsn + ']'));
    //     // Convert all packages into one json
    //     // this.data = JSON.parse('[' + jsn + ']');
    //     this.infoPackagesToJson(JSON.parse('[' + jsn + ']'));
    //     this.loader = false;
    //     // Enable execute button
    //     $('#btn-execute').attr('disabled', false);
    //     $('#btn-execute').css('opacity', '1');
    //   }
    // }, 500);
    //18/Feb/2022 17:40:27
    // let latest_date = this.datePipe.transform(
    //   this.myDate,
    //   'dd/MM/yyyy HH:MM:SS'
    // );
    // setTimeout(() => {
    //   this.loader = false;
    //   this.result = false;
    //   // Enable execute button
    //   $('#btn-execute').attr('disabled', false);
    //   $('#btn-execute').css('opacity', '1');
    //   // Show overlay
    //   // $('#overlay').removeClass('show');
    //   setTimeout(() => {
    //     // Reset green color
    //     this.defaultColor = true;
    //   }, 4000);
    // }, 3000);
  }

  remove_crlf(ref: any) {
    return ref.replace(new RegExp('[\r\n]', 'gm'), ',');
    // return ref.replace(/,/g, '\n');
  }

  processResponse(data: any) {
    // console.log(data.length);
    let result = '<table class="table table-border table-striped"><thead><tr>';
    let c = 0;
    for (let item of data) {
      // console.log(data[i]);
      if (c === 0) {
        for (let th of item) {
          result += '<th>' + th + '</th>';
          console.log(th);
        }
        result += '</tr><thead><tbody>';
      } else {
        result += '<tr>';
        for (let td of item) {
          result += '<td>' + td + '</td>';
        }
        result += '</tr>';
      }
      c++;
    }
    result += '</tbody></table>';

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }

  processResponse2(data: any) {
    // console.log(data.length);
    let result =
      '<table class="table table-border table-striped tbl-response">';
    let c = 0;
    let rowThs = [];
    for (let item of data[0]) {
      rowThs.push(item);
    }
    for (let item of data) {
      // console.log(data[i]);
      if (c > 0) {
        result +=
          '<tr><td class="row"><div class="col-12 text-center"><span class="badge bg-secondary">' +
          c +
          '</span></div>';
        let th = 0;
        for (let td of item) {
          if (td == '') {
            td = '--';
          }
          result +=
            '<div class="row"><div class="col-3 pb-3 rowTh"><strong>' +
            rowThs[th] +
            ':</strong></div><div class="col-9 pb-3">' +
            td +
            '</div></div>';
          th++;
        }
        result += '</td></tr>';
      }
      c++;
    }
    result += '</table>';

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }

  infoPackagesToJson(obj: any) {
    let json: any[] = [];
    let infoDataMessageTypeOnly = true;
    for (let item of obj) {
      let jsonPkg = JSON.parse(item.package);
      this.data.push(jsonPkg);
      // console.log(jsonPkg.type);
      if (
        jsonPkg.type === 'NoticeMessage' ||
        jsonPkg.type === 'SuccessMessage' ||
        jsonPkg.type === 'WarningMessage' ||
        jsonPkg.type === 'ErrorMessage' ||
        jsonPkg.type === 'TableMessage'
      ) {
        infoDataMessageTypeOnly = false;
      }
    }
    this.infoDataMessageTypeOnly = infoDataMessageTypeOnly;
  }
}
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

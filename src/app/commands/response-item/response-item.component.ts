import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { Data } from 'popper.js';
declare let $: any;
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
    let dataResponse: any;
    let intArr: any;
    let url = this.appService.url;
    let user = this.appService.user;
    let token = this.appService.token;
    //console.log(url);
    //console.log('submitted');
    // this.appService
    //   .executeCommand(this.action, this.formData)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });

    $.ajax({
      method: 'POST',
      url: url + this.action,
      data: this.formData,
      beforeSend: function (xhr: any) {
        xhr.setRequestHeader('Authorization', 'Token ' + user + ' ' + token);
      },
      processData: true,
      complete: function (msg: any) {
        dataResponse = msg.responseText;
      },
    });
    intArr = setInterval(() => {
      if (dataResponse != undefined) {
        clearInterval(intArr);
        $('#btn-execute').attr('disabled', true);
        $('#btn-execute').css('opacity', '.5');
        console.log(dataResponse);
        dataResponse = dataResponse.trim();
        let jsn = this.remove_crlf(dataResponse);
        // console.log(JSON.parse('[' + jsn + ']'));
        // Convert all packages into one json
        // this.data = JSON.parse('[' + jsn + ']');
        this.infoPackagesToJson(JSON.parse('[' + jsn + ']'));
        this.loader = false;
        // Enable execute button
        $('#btn-execute').attr('disabled', false);
        $('#btn-execute').css('opacity', '1');
      }
    }, 500);

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
            '<div class="col-3 pb-3 rowTh"><strong>' +
            rowThs[th] +
            ':</strong></div><div class="col-9 pb-3">' +
            td +
            '</div>';
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
    for (let item of obj) {
      this.data.push(JSON.parse(item.package));
    }
  }
}
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

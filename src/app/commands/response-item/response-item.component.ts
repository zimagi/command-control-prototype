import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
declare let $: any;
@Component({
  selector: 'app-response-item',
  templateUrl: './response-item.component.html',
  styleUrls: ['./response-item.component.scss'],
})
export class ResponseItemComponent implements OnInit {
  @Input() action: string = '';
  result: boolean = true;
  // loader: boolean = false;
  myDate = new Date();
  timeNow: any;
  formatedDate: any;
  defaultColor: boolean = false;
  data: any = [];
  @Input() loader: boolean = false;
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
  constructor(private datePipe: DatePipe) {}

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
    $.ajax({
      method: 'POST',
      url: 'https://demo.zimagi.com:5123/' + this.action,
      beforeSend: function (xhr: any) {
        xhr.setRequestHeader(
          'Authorization',
          'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3'
        );
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
  infoPackagesToJson(obj: any) {
    let json: any[] = [];
    for (let item of obj) {
      this.data.push(JSON.parse(item.package));
    }
  }
}

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
  loader: boolean = true;
  result: boolean = true;
  myDate = new Date();
  timeNow: any;
  formatedDate: any;
  defaultColor: boolean = false;
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
    //18/Feb/2022 17:40:27
    // let latest_date = this.datePipe.transform(
    //   this.myDate,
    //   'dd/MM/yyyy HH:MM:SS'
    // );
    setTimeout(() => {
      this.loader = false;
      this.result = false;
      // Enable execute button
      $('#btn-execute').attr('disabled', false);
      $('#btn-execute').css('opacity', '1');
      // Show overlay
      // $('#overlay').removeClass('show');
      setTimeout(() => {
        // Reset green color
        this.defaultColor = true;
      }, 4000);
    }, 3000);
  }
}

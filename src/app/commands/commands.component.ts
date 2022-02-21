import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
declare const $: any;
@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  dataCommands: any[] = [];
  constructor(
    private router: Router,
    private appService: AppService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.dataCommands = this.appService.getCommands();
    $('#main').css('height', window.innerHeight - 80 + 'px');
    $(window).resize(function () {
      $('#main').css('height', window.innerHeight - 80 + 'px');
    });
  }
  buildOptions(command: any, actions: any) {
    let result: string = '';
    if (actions!._type)
      for (let [key, value] of Object.entries(actions)) {
        // console.log(`${key}: ${value}`);
        result +=
          '<a href="commands/' +
          command +
          '/' +
          key +
          '" class="list-group-item list-group-item-action">' +
          key +
          '</a>';
      }
    // console.log(result);
    return this._sanitizer.bypassSecurityTrustHtml(result);
  }
  // goToPage(command: any, action: any) {
  //   this.router.navigate(['/' + command + '/' + action]);
  // }
}
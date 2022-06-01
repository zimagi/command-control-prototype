import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
declare const $: any;
@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  dataCommands: any[] = [];
  responsesObj: any[] = [];
  fullScreen = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Get responses
    this.responsesObj = this.appService.responses;

    // let resolvedCommands: any = this.route.snapshot.data['commandsData'];
    // if (resolvedCommands instanceof Error) {
    //   console.log('Error: ' + resolvedCommands);
    // } else {
    //   this.appService.commandsList = resolvedCommands;
    //   this.dataCommands = this.appService.commandsList;
    // }
    if (
      !this.appService.url &&
      !this.appService.user &&
      !this.appService.token
    ) {
      this.router.navigate(['/']);
    }

    this.appService.getAllCommands().subscribe((data: any) => {
      this.appService.commandsList = data;
      this.dataCommands = this.appService.commandsList;
    });

    this.appService.getCommandsStream();
  }

  ngAfterViewInit() {
    $('#main, #response-panel').css('height', window.innerHeight - 80 + 'px');
    $(window).resize(function () {
      $('#main, #response-panel').css('height', window.innerHeight - 80 + 'px');
    });
  }

  toggleFull() {
    this.fullScreen = this.fullScreen === false ? true : false;
    if (this.fullScreen === true) {
      //  Hide Main Container
      $('#main-container').hide();
      $('#response-panel').removeClass('col-4').addClass('col-12');
    } else {
      $('#main-container').show();
      $('#response-panel').removeClass('col-12').addClass('col-4');
    }
  }

  clearResponses() {
    this.appService.responses = [];
    this.responsesObj = this.appService.responses;
  }

  // buildOptions(command: any, actions: any) {
  //   let result: string = '';

  //   if (actions._type == 'link') {
  //     // console.log('---' + '_link');
  //     result +=
  //       '<a href="commands/' +
  //       command +
  //       '/' +
  //       command +
  //       '" class="list-group-item list-group-item-action">' +
  //       command +
  //       '</a>';
  //   } else {
  //     for (let [key, value] of Object.entries(actions)) {
  //       // console.log(`${key}: ${value}`);
  //       result +=
  //         '<a href="commands/' +
  //         command +
  //         '/' +
  //         key +
  //         '" class="list-group-item list-group-item-action">' +
  //         key +
  //         '</a>';
  //     }
  //   }
  //   // console.log(result);
  //   return this._sanitizer.bypassSecurityTrustHtml(result);
  // }
}

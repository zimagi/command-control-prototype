import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from '../app.service';
import { HostListener } from '@angular/core';
declare const $: any;
declare const axios: any;
declare let dataResponse: any;

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  // dataCommands$: Observable<any[]> | undefined;
  dataCommands: any[] = [];
  responsesObj: any[] = [];
  fullScreen = false;

  myCommands$ = new Observable();
  allowRedirect = false;

  private errorMessage: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Get responses
    this.responsesObj = this.appService.responses;

    // const instance = axios.create({
    //   baseURL: this.appService.url,
    //   headers: {
    //     Authorization:
    //       'Token ' + this.appService.user + ' ' + this.appService.token,
    //   },
    // });

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

    // const url = this.appService.url;
    // const user = this.appService.user;
    // const token = this.appService.token;

    // axios
    //   .post(url + 'group/list', {
    //     headers: {
    //       Authorization: 'Token admin' + user + ' ' + token,
    //     },
    //     responseType: 'stream',
    //   })
    //   .then(function (response: any) {
    //     // handle success
    //     console.log(response.data);
    //   })
    //   .catch(function (error: any) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });

    // async function getGroupList() {
    //   console.log('called');
    //   try {
    //     const response = await axios.post(url + 'group/list', {
    //       headers: {
    //         Authorization: 'Token admin' + user + ' ' + token,
    //       },
    //       responseType: 'stream',
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    // getGroupList();

    // this.dataCommands$ = this.appService.getAllCommands().pipe(
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     return EMPTY;
    //   })
    // );
    // console.log(this.dataCommands$);

    // this.appService.getAllCommands().subscribe((data: any) => {
    //   this.appService.commandsList = data;
    this.dataCommands = this.appService.commandsList;
    console.log(this.dataCommands);
    // });
    // this.appService.getCommandsStream();
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
    dataResponse = '';
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

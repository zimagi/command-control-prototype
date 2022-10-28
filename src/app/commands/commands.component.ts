import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from '../app.service';
import { HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
declare const $: any;
declare const axios: any;
declare let dataResponse: any;
declare let executing: any;
declare let localStorage: any;
declare let idleTime: any;
declare let idleTimeNum: any;
declare let intTimeToLogout: any;

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
  appUrl = '';
  loading = false;
  error_message = '';

  myCommands$ = new Observable();
  allowRedirect = false;
  intCommands: any;

  intTimeToLogout!: any;

  private errorMessage: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // intTimeToLogout = setInterval(() => {
    //   if (this.appService.processingData === false) {
    //     if (idleTime > 0) {
    //       idleTime--;
    //       //console.log(idleTime);
    //     }

    //     if (idleTime === 0) {
    //       console.log(this.appService.logged);
    //       if (this.appService.logged === true) {
    //         this.authService.logout();
    //       }

    //       console.log('logout from interval');
    //     }
    //   }
    // }, 1000);
    // Get responses
    this.responsesObj = this.appService.responses;
    // console.log(this.authService.checkLoggedIn());
    // console.log(this.dataCommands.length);
    this.loading = true;
    if (
      this.authService.checkLoggedIn() === true &&
      this.dataCommands.length == 0
    ) {
      this.appService.url = JSON.parse(localStorage.getItem('zimagi')).url;
      this.appService.user = JSON.parse(localStorage.getItem('zimagi')).user;
      this.appService.token = JSON.parse(localStorage.getItem('zimagi')).token;
      this.appService.getAllCommands().subscribe(
        (data: any) => {
          // console.log(data);
          this.appService.logged = true;
          this.appService.commandsList = data;
          this.dataCommands = this.appService.commandsList;
          this.appUrl = this.appService.url;
          this.loading = false;
        },
        (err) => {
          if (err == 0) {
            this.loading = false;
            this.error_message =
              '<strong>API Server is not responding.</strong> <br>Please contact your system administrator.';
          }
        }
      );
    } else {
      this.authService.logout();
    }
    this.dataCommands = this.appService.commandsList;
    // console.log(this.dataCommands);
    this.appUrl = this.appService.url;

    setTimeout(() => {
      $('a, button, input').click(function () {
        idleTime = idleTimeNum;
      });
      // console.log('reset');
    }, 1000);
  }

  ngAfterViewInit() {
    $('#main, #response-panel').css('height', window.innerHeight - 80 + 'px');
    $(window).resize(function () {
      $('#main, #response-panel').css('height', window.innerHeight - 80 + 'px');
    });
  }

  executionInProgress() {}

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
}

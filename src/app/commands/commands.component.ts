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
declare const $: any;
declare const axios: any;
declare let dataResponse: any;
declare let executing: any;

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

  myCommands$ = new Observable();
  allowRedirect = false;
  intCommands: any;

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
    if (
      !this.appService.url &&
      !this.appService.user &&
      !this.appService.token
    ) {
      this.router.navigate(['/']);
    }
    this.dataCommands = this.appService.commandsList;
    // console.log(this.dataCommands);
    this.appUrl = this.appService.url;
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

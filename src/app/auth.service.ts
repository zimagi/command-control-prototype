import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AppService } from './app.service';

declare let localStorage: any;
declare let dataResponse: any;

declare let idleTime: any;
declare let idleTimeNum: any;

// declare let intTimeToLogout: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  // login(user: any, token: any): Observable<any> {
  //   console.log(user);
  //   this.isUserLoggedIn = true;
  //   // this.isUserLoggedIn =
  //   //   user == 'admin' && token == 'uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  //   // localStorage.setItem(
  //   //   'isUserLoggedIn',
  //   //   this.isUserLoggedIn ? 'true' : 'false'
  //   // );

  //   // return of(this.isUserLoggedIn).pipe(
  //   //   delay(1000),
  //   //   tap((val) => {
  //   //     console.log('Is User Authentication is successful: ' + val);
  //   //   })
  //   // );
  // }
  loading = false;
  error_message = '';
  intTimeToLogout!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {}

  checkLoggedIn() {
    if (JSON.parse(localStorage.getItem('zimagi'))) {
      return true;
    }
    return false;
  }

  loginInterval() {
    this.intTimeToLogout = setInterval(() => {
      if (this.appService.processingData === false) {
        if (idleTime > 0) {
          idleTime--;
          // console.log(idleTime);
        }

        if (idleTime === 0) {
          idleTime = idleTimeNum;
          clearInterval(this.intTimeToLogout);
          this.logout();
        }
      }
    }, 1000);
  }

  logout(): void {
    idleTime = idleTimeNum;
    clearInterval(this.intTimeToLogout);
    this.isUserLoggedIn = false;
    this.appService.logged = false;
    this.appService.commandsList = [];
    this.appService.responses = [];
    dataResponse = undefined;
    localStorage.removeItem('zimagi');
    this.router.navigate(['/']);
    console.log('logout');
  }
}

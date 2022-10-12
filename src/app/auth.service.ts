import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AppService } from './app.service';

declare let localStorage: any;

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

  login() {
    // this.appService.getAllCommands().subscribe(
    //   (data: any) => {
    //     // console.log(data);
    //     this.appService.logged = true;
    //     this.appService.commandsList = data;
    //     this.router.navigate(['/commands']);
    //     // Set creds in local
    //     localStorage.setItem(
    //       'zimagi',
    //       JSON.stringify({
    //         url: this.appService.url,
    //         user: this.appService.user,
    //         token: this.appService.token,
    //       })
    //     );
    //   },
    //   (err) => {
    //     if (err == 0) {
    //       this.appService.loading = false;
    //       console.log('error');
    //       this.appService.errorMsg =
    //         '<strong>API Server is not responding.</strong> <br>Please contact your system administrator.';
    //     }
    //   }
    // );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    this.appService.logged = false;
    localStorage.removeItem('zimagi');
    this.router.navigate(['/']);
  }
}

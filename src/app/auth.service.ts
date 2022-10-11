import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AppService } from './app.service';

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
  constructor( private route: ActivatedRoute,
    private router: Router,
    private appService: AppService) {}
  checkLoggedIn(){
    this.appService.getAllCommands().subscribe(
      (data: any) => {
        // console.log(data.status);
        this.isUserLoggedIn = true;
        this.appService.commandsList = data;
      },
      (err) => {
        if (err == 0) {
          this.isUserLoggedIn = false;
          this.loading = false;
          this.error_message =
            '<strong>API Server is not responding.</strong> <br>Please contact your system administrator.';
        }

      }
    );
  }

  login(){
    this.appService.getAllCommands().subscribe(
      (data: any) => {
        // console.log(data.status);
        this.appService.commandsList = data;
        this.router.navigate(['/commands']);
      },
      (err) => {
        if (err == 0) {
          this.loading = false;
          this.error_message =
            '<strong>API Server is not responding.</strong> <br>Please contact your system administrator.';
        }
      }
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }
}

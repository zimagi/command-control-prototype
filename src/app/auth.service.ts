import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  login(user: any, token: any): Observable<any> {
    console.log(user);
    this.isUserLoggedIn = true;
    // this.isUserLoggedIn =
    //   user == 'admin' && token == 'uy5c8xiahf93j2pl8s00e6nb32h87dn3';
    // localStorage.setItem(
    //   'isUserLoggedIn',
    //   this.isUserLoggedIn ? 'true' : 'false'
    // );

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  constructor() {}
}

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  responsesList: any[] = [];
  private _commandsList: any[] = [];
  handleError: any;
  private _url!: string;
  private _user!: string;
  private _token!: string;

  // authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get commandsList(): any[] {
    return this._commandsList;
  }
  set commandsList(arr: any[]) {
    this._commandsList = arr;
  }
  get responses(): any[] {
    return this.responsesList;
  }
  set responses(arr: any[]) {
    this.responsesList = arr;
  }
  get url(): string {
    return this._url;
  }
  set url(v: string) {
    this._url = v;
  }
  get user(): string {
    return this._user;
  }
  set user(v: string) {
    this._user = v;
  }
  get token(): string {
    return this._token;
  }
  set token(v: string) {
    this._token = v;
  }

  getAllCommands(): Observable<any[]> {
    this.url = this.url;
    return this.http
      .get<any[]>(this.url, {
        headers: new HttpHeaders({
          Authorization: 'Token ' + this.user + ' ' + this.token,
        }),
      })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  executeCommand(command: any): Observable<any[]> {
    this.url = this.url;
    console.log(this.url + command);
    const body = JSON.stringify(command);
    return this.http
      .post<any[]>(
        this.url + command,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Token ' + this.user + ' ' + this.token,
          }),
        }
      )
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  sortByReq(i1: any, i2: any) {
    if (i1.required > i2.required) {
      return 1;
    } else if (i1.required === i2.required) {
      return 0;
    } else {
      return -1;
    }
  }
  // sortByRequired(a: any, b: any) {
  //   var an = a.getAttribute('data-required'),
  //     bn = b.getAttribute('data-required');

  //   if (an < bn) {
  //     return 1;
  //   }
  //   if (an > bn) {
  //     return -1;
  //   }
  //   return 0;
  // }
}

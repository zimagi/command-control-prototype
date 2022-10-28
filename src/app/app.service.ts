import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of, Subject, Observer } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

declare let $: any;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  responsesList: any[] = [];

  private _commandsList: any[] = [];
  private _url!: string;
  private _user!: string;
  private _token!: string;
  private _logged = false;
  private _processingData = false;
  private _loading = false;
  private _errorMsg = '';

  eventSource: any | '';
  // authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
  private subject: Subject<MessageEvent> | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  get loading(): boolean {
    return this._loading;
  }
  set loading(bool: boolean) {
    this._loading = bool;
  }
  get errorMsg(): string {
    return this._errorMsg;
  }
  set errorMsg(str: string) {
    this._errorMsg = str;
  }
  get logged(): boolean {
    return this._logged;
  }
  set logged(bool: boolean) {
    this._logged = bool;
  }
  get processingData(): boolean {
    return this._processingData;
  }
  set processingData(bool: boolean) {
    this._processingData = bool;
  }
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

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected' + url);
    }
    return this.subject;
  }

  public create(url: string): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return Subject.create(observer, observable);
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

  getStatus(): Observable<any[]> {
    return this.http
      .get<any[]>(this.url + '/status', {
        headers: new HttpHeaders({
          Authorization: 'Token ' + this.user + ' ' + this.token,
        }),
      })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  getCommandStream(): Observable<any[]> {
    return this.http
      .post<any[]>(this.url + 'group/list', null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.user + ' ' + this.token,
        }),
      })
      .pipe(
        tap((data) => console.log('data', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  executeCommand(command: any, frmData: any): Observable<any[]> {
    this.url = this.url;
    // console.log(this.url + command);
    // console.log(frmData);
    const body = JSON.stringify(frmData);
    // console.log(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + this.user + ' ' + this.token,
    });
    let options = { headers: headers };

    return this.http
      .post<any[]>(this.url + command, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.user + ' ' + this.token,
        }),
      })
      .pipe(
        map((data) => data),
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

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      errorMessage =
        'Server returned code: ' +
        err.status +
        ', error message is: ' +
        err.message;
    }
    //console.error(errorMessage);
    return throwError(err.status);
  }
}

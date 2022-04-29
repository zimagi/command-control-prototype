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
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3',
  }),
};
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

  authHead = 'Token admin uy5c8xiahf93j2pl8s00e6nb32h87dn3';
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
    this.url = 'https://demo.zimagi.com:5123/';
    return this.http
      .get<any[]>(this.url, {
        headers: new HttpHeaders({
          Authorization: this.authHead,
        }),
      })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }
  executeCommand(command: any): Observable<any[]> {
    this.url = 'https://demo.zimagi.com:5123/';
    return this.http
      .post<any[]>(this.url + command, {
        headers: new HttpHeaders({
          Authorization: this.authHead,
        }),
      })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }
  getCommands() {
    // Sample data
    return [
      {
        user: {
          rotate: {
            _type: 'link',
            url: '/user/rotate',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Rotate credentials for active user Rotates credentials for the active user, activates user for remote environment. Requires remote environment be specified. Takes `user_name`` - Name of user to rotate. ',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'user_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'user_name',
                  description: '[@option_user_name] user name',
                },
                tags: ['key'],
              },
            ],
          },
          list: {
            _type: 'link',
            url: '/user/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List system users Returns all of the users for the current environment. Takes one or more search queries. ',
            resource: 'user',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'user_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated user_order',
                  description:
                    '[@option_user_order] user ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'user_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'user_limit',
                  description: '[@option_user_limit] user result limit <100>',
                },
                tags: ['list', 'limit'],
              },
              {
                name: 'instance_search_query',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded instance_search_query',
                  description:
                    '[@option_instance_search_query] one or more search queries',
                },
                tags: ['search'],
              },
              {
                name: 'instance_search_or',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'instance_search_or',
                  description:
                    '[@option_instance_search_or] perform an OR query on input filters',
                },
                tags: ['search'],
              },
              {
                name: 'field_names',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated field_names',
                  description:
                    '[@option_field_names] field names to display (comma separated)',
                },
                tags: ['fields'],
              },
            ],
          },
          get: {
            _type: 'link',
            url: '/user/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Get information for a system user Returns the stored information for a provided user. Takes ``user_name`` - The name of a user to retrieve information for. ',
            resource: 'user',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'user_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'user_name',
                  description: 'user name',
                },
                tags: ['key'],
              },
              {
                name: 'field_names',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated field_names',
                  description:
                    '[@option_field_names] field names to display (comma separated)',
                },
                tags: ['fields'],
              },
            ],
          },
          save: {
            _type: 'link',
            url: '/user/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Save a system user Add/save a system user and user attributes. Takes ``user_name`` - Key-value pair containing the name of a user to add or update. Optional Key-value pairs - ``email``, ``first_name``, ``last_name``,``is_active``. ',
            resource: 'user',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'test',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'test',
                  description:
                    '[@option_test] test execution without permanent changes',
                },
                tags: ['system'],
              },
              {
                name: 'force',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'force',
                  description:
                    '[@option_force] force execution even with provider errors',
                },
                tags: ['system'],
              },
              {
                name: 'user_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'user_provider_name',
                  description:
                    '[@option_user_provider_name] system user provider <base>',
                },
                tags: ['provider'],
              },
              {
                name: 'user_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'user_name',
                  description: 'user name',
                },
                tags: ['key'],
              },
              {
                name: 'user_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded user_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: email email first_name string last_name string is_active boolean (True) encryption_key encryptedchar ',
                },
                tags: ['fields'],
              },
              {
                name: 'groups_names',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated groups_names',
                  description:
                    '[@option_groups_names] one or more group names <> (comma separated)',
                },
                tags: ['relation'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/user/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing system user Takes ``user_name`` - The name of a user to remove. ',
            resource: 'user',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'force',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'force',
                  description:
                    '[@option_force] force execution even with provider errors',
                },
                tags: ['system'],
              },
              {
                name: 'user_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'user_name',
                  description: 'user name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/user/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Clear all existing system users (reset to default) Clears all users from the system, resetting the system to its default state. Takes one or more search queries. ',
            resource: 'user',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'instance_search_query',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded instance_search_query',
                  description:
                    '[@option_instance_search_query] one or more search queries',
                },
                tags: ['search'],
              },
              {
                name: 'instance_search_or',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'instance_search_or',
                  description:
                    '[@option_instance_search_or] perform an OR query on input filters',
                },
                tags: ['search'],
              },
              {
                name: 'force',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'force',
                  description:
                    '[@option_force] force execution even with provider errors',
                },
                tags: ['system'],
              },
            ],
          },
        },

        template: {
          generate: {
            _type: 'link',
            url: '/template/generate',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            fields: [
              {
                name: 'verbosity',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'verbosity',
                  description:
                    '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                },
                tags: ['display'],
              },
              {
                name: 'debug',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'debug',
                  description:
                    '[@option_debug] run in debug mode with error tracebacks',
                },
                tags: ['display'],
              },
              {
                name: 'display_width',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'display_width',
                  description: '[@option_display_width] CLI display width <80>',
                },
                tags: ['display'],
              },
              {
                name: 'no_parallel',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'no_parallel',
                  description:
                    '[@option_no_parallel] disable parallel processing',
                },
                tags: ['system'],
              },
              {
                name: 'push_queue',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'push_queue',
                  description:
                    '[@option_push_queue] run command in the background and follow execution results',
                },
                tags: ['system'],
              },
              {
                name: 'async_exec',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'async_exec',
                  description:
                    '[@option_async_exec] return immediately and let queued command execution run in background',
                },
                tags: ['system'],
              },
              {
                name: 'lock_id',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'lock_id',
                  description:
                    '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_error',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'lock_error',
                  description:
                    '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_timeout',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_timeout',
                  description:
                    '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                },
                tags: ['lock'],
              },
              {
                name: 'lock_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'lock_interval',
                  description:
                    '[@option_lock_interval] command lock check interval in seconds <2>',
                },
                tags: ['lock'],
              },
              {
                name: 'run_once',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'run_once',
                  description:
                    '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                },
                tags: ['lock'],
              },
              {
                name: 'schedule',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule',
                  description:
                    "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_begin',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_begin',
                  description:
                    "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'schedule_end',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'schedule_end',
                  description:
                    "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                },
                tags: ['schedule'],
              },
              {
                name: 'command_notify',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify',
                  description:
                    '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'command_notify_failure',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated command_notify_failure',
                  description:
                    '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                },
                tags: ['notification', 'groups'],
              },
              {
                name: 'module_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_name',
                  description: 'module name',
                },
                tags: ['key'],
              },
              {
                name: 'module_template',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_template',
                  description: 'Template package name (type/package)',
                },
                tags: ['template'],
              },
              {
                name: 'template_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded template_fields',
                  description: ' fields as key value pairs ',
                },
                tags: ['template'],
              },
              {
                name: 'display_only',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'display_only',
                  description:
                    '[@option_display_only] render combined module profile without executing',
                },
                tags: ['profile', 'test'],
              },
            ],
          },
          lock: {
            set: {
              _type: 'link',
              url: '/service/lock/set',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Set a service lock key Execute `service clear` to ensure a key does not exist or `service wait` to wait for a key to be set ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'key',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'key',
                    description: 'service key',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/service/lock/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Clear one or more service lock keys Execute `service set` to create a key or `service wait` to wait for a key to be set ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'keys',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'JSON encoded keys',
                    description: 'one or more service keys',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
            wait: {
              _type: 'link',
              url: '/service/lock/wait',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Wait for one or more service lock keys to be set Execute `service set` to create a key or `service clear` to ensure a key does not exist ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'keys',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'JSON encoded keys',
                    description: 'one or more service keys',
                  },
                  tags: ['service_lock'],
                },
                {
                  name: 'timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'timeout',
                    description:
                      '[@option_timeout] wait timeout in seconds <600>',
                  },
                  tags: ['service_lock'],
                },
                {
                  name: 'interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'interval',
                    description:
                      '[@option_interval] poll interval during wait period in seconds <1>',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
          },
        },
        service: {
          lock: {
            set: {
              _type: 'link',
              url: '/service/lock/set',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Set a service lock key Execute `service clear` to ensure a key does not exist or `service wait` to wait for a key to be set ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'key',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'key',
                    description: 'service key',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/service/lock/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Clear one or more service lock keys Execute `service set` to create a key or `service wait` to wait for a key to be set ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'keys',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'JSON encoded keys',
                    description: 'one or more service keys',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
            wait: {
              _type: 'link',
              url: '/service/lock/wait',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Wait for one or more service lock keys to be set Execute `service set` to create a key or `service clear` to ensure a key does not exist ',
              fields: [
                {
                  name: 'verbosity',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'verbosity',
                    description:
                      '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'debug',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'debug',
                    description:
                      '[@option_debug] run in debug mode with error tracebacks',
                  },
                  tags: ['display'],
                },
                {
                  name: 'display_width',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'display_width',
                    description:
                      '[@option_display_width] CLI display width <80>',
                  },
                  tags: ['display'],
                },
                {
                  name: 'no_parallel',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'no_parallel',
                    description:
                      '[@option_no_parallel] disable parallel processing',
                  },
                  tags: ['system'],
                },
                {
                  name: 'push_queue',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'push_queue',
                    description:
                      '[@option_push_queue] run command in the background and follow execution results',
                  },
                  tags: ['system'],
                },
                {
                  name: 'async_exec',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'async_exec',
                    description:
                      '[@option_async_exec] return immediately and let queued command execution run in background',
                  },
                  tags: ['system'],
                },
                {
                  name: 'lock_id',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'lock_id',
                    description:
                      '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_error',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'lock_error',
                    description:
                      '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_timeout',
                    description:
                      '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'lock_interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'lock_interval',
                    description:
                      '[@option_lock_interval] command lock check interval in seconds <2>',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'run_once',
                  location: 'form',
                  schema: {
                    _type: 'boolean',
                    title: 'run_once',
                    description:
                      '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                  },
                  tags: ['lock'],
                },
                {
                  name: 'schedule',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule',
                    description:
                      "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_begin',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_begin',
                    description:
                      "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'schedule_end',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'schedule_end',
                    description:
                      "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                  },
                  tags: ['schedule'],
                },
                {
                  name: 'command_notify',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify',
                    description:
                      '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'command_notify_failure',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated command_notify_failure',
                    description:
                      '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                  },
                  tags: ['notification', 'groups'],
                },
                {
                  name: 'keys',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'JSON encoded keys',
                    description: 'one or more service keys',
                  },
                  tags: ['service_lock'],
                },
                {
                  name: 'timeout',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'timeout',
                    description:
                      '[@option_timeout] wait timeout in seconds <600>',
                  },
                  tags: ['service_lock'],
                },
                {
                  name: 'interval',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'interval',
                    description:
                      '[@option_interval] poll interval during wait period in seconds <1>',
                  },
                  tags: ['service_lock'],
                },
              ],
            },
          },
        },
        service2: {
          lock1: {
            lock2: {
              lock3: {
                lock4: {
                  set: {
                    _type: 'link',
                    url: '/service/lock/set',
                    action: 'post',
                    encoding: 'application/x-www-form-urlencoded',
                    description:
                      'Set a service lock key Execute `service clear` to ensure a key does not exist or `service wait` to wait for a key to be set ',
                    fields: [
                      {
                        name: 'verbosity',
                        location: 'form',
                        schema: {
                          _type: 'integer',
                          title: 'verbosity',
                          description:
                            '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                        },
                        tags: ['display'],
                      },
                      {
                        name: 'debug',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'debug',
                          description:
                            '[@option_debug] run in debug mode with error tracebacks',
                        },
                        tags: ['display'],
                      },
                      {
                        name: 'display_width',
                        location: 'form',
                        schema: {
                          _type: 'integer',
                          title: 'display_width',
                          description:
                            '[@option_display_width] CLI display width <80>',
                        },
                        tags: ['display'],
                      },
                      {
                        name: 'no_parallel',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'no_parallel',
                          description:
                            '[@option_no_parallel] disable parallel processing',
                        },
                        tags: ['system'],
                      },
                      {
                        name: 'push_queue',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'push_queue',
                          description:
                            '[@option_push_queue] run command in the background and follow execution results',
                        },
                        tags: ['system'],
                      },
                      {
                        name: 'async_exec',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'async_exec',
                          description:
                            '[@option_async_exec] return immediately and let queued command execution run in background',
                        },
                        tags: ['system'],
                      },
                      {
                        name: 'lock_id',
                        location: 'form',
                        schema: {
                          _type: 'string',
                          title: 'lock_id',
                          description:
                            '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                        },
                        tags: ['lock'],
                      },
                      {
                        name: 'lock_error',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'lock_error',
                          description:
                            '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                        },
                        tags: ['lock'],
                      },
                      {
                        name: 'lock_timeout',
                        location: 'form',
                        schema: {
                          _type: 'integer',
                          title: 'lock_timeout',
                          description:
                            '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                        },
                        tags: ['lock'],
                      },
                      {
                        name: 'lock_interval',
                        location: 'form',
                        schema: {
                          _type: 'integer',
                          title: 'lock_interval',
                          description:
                            '[@option_lock_interval] command lock check interval in seconds <2>',
                        },
                        tags: ['lock'],
                      },
                      {
                        name: 'run_once',
                        location: 'form',
                        schema: {
                          _type: 'boolean',
                          title: 'run_once',
                          description:
                            '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                        },
                        tags: ['lock'],
                      },
                      {
                        name: 'schedule',
                        location: 'form',
                        schema: {
                          _type: 'string',
                          title: 'schedule',
                          description:
                            "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                        },
                        tags: ['schedule'],
                      },
                      {
                        name: 'schedule_begin',
                        location: 'form',
                        schema: {
                          _type: 'string',
                          title: 'schedule_begin',
                          description:
                            "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                        },
                        tags: ['schedule'],
                      },
                      {
                        name: 'schedule_end',
                        location: 'form',
                        schema: {
                          _type: 'string',
                          title: 'schedule_end',
                          description:
                            "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                        },
                        tags: ['schedule'],
                      },
                      {
                        name: 'command_notify',
                        location: 'form',
                        schema: {
                          _type: 'array',
                          title: 'Comma separated command_notify',
                          description:
                            '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                        },
                        tags: ['notification', 'groups'],
                      },
                      {
                        name: 'command_notify_failure',
                        location: 'form',
                        schema: {
                          _type: 'array',
                          title: 'Comma separated command_notify_failure',
                          description:
                            '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                        },
                        tags: ['notification', 'groups'],
                      },
                      {
                        name: 'key',
                        required: true,
                        location: 'form',
                        schema: {
                          _type: 'string',
                          title: 'key',
                          description: 'service key',
                        },
                        tags: ['service_lock'],
                      },
                    ],
                  },
                },
                set: {
                  _type: 'link',
                  url: '/service/lock/set',
                  action: 'post',
                  encoding: 'application/x-www-form-urlencoded',
                  description:
                    'Set a service lock key Execute `service clear` to ensure a key does not exist or `service wait` to wait for a key to be set ',
                  fields: [
                    {
                      name: 'verbosity',
                      location: 'form',
                      schema: {
                        _type: 'integer',
                        title: 'verbosity',
                        description:
                          '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                      },
                      tags: ['display'],
                    },
                    {
                      name: 'debug',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'debug',
                        description:
                          '[@option_debug] run in debug mode with error tracebacks',
                      },
                      tags: ['display'],
                    },
                    {
                      name: 'display_width',
                      location: 'form',
                      schema: {
                        _type: 'integer',
                        title: 'display_width',
                        description:
                          '[@option_display_width] CLI display width <80>',
                      },
                      tags: ['display'],
                    },
                    {
                      name: 'no_parallel',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'no_parallel',
                        description:
                          '[@option_no_parallel] disable parallel processing',
                      },
                      tags: ['system'],
                    },
                    {
                      name: 'push_queue',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'push_queue',
                        description:
                          '[@option_push_queue] run command in the background and follow execution results',
                      },
                      tags: ['system'],
                    },
                    {
                      name: 'async_exec',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'async_exec',
                        description:
                          '[@option_async_exec] return immediately and let queued command execution run in background',
                      },
                      tags: ['system'],
                    },
                    {
                      name: 'lock_id',
                      location: 'form',
                      schema: {
                        _type: 'string',
                        title: 'lock_id',
                        description:
                          '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                      },
                      tags: ['lock'],
                    },
                    {
                      name: 'lock_error',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'lock_error',
                        description:
                          '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                      },
                      tags: ['lock'],
                    },
                    {
                      name: 'lock_timeout',
                      location: 'form',
                      schema: {
                        _type: 'integer',
                        title: 'lock_timeout',
                        description:
                          '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                      },
                      tags: ['lock'],
                    },
                    {
                      name: 'lock_interval',
                      location: 'form',
                      schema: {
                        _type: 'integer',
                        title: 'lock_interval',
                        description:
                          '[@option_lock_interval] command lock check interval in seconds <2>',
                      },
                      tags: ['lock'],
                    },
                    {
                      name: 'run_once',
                      location: 'form',
                      schema: {
                        _type: 'boolean',
                        title: 'run_once',
                        description:
                          '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                      },
                      tags: ['lock'],
                    },
                    {
                      name: 'schedule',
                      location: 'form',
                      schema: {
                        _type: 'string',
                        title: 'schedule',
                        description:
                          "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                      },
                      tags: ['schedule'],
                    },
                    {
                      name: 'schedule_begin',
                      location: 'form',
                      schema: {
                        _type: 'string',
                        title: 'schedule_begin',
                        description:
                          "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                      },
                      tags: ['schedule'],
                    },
                    {
                      name: 'schedule_end',
                      location: 'form',
                      schema: {
                        _type: 'string',
                        title: 'schedule_end',
                        description:
                          "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                      },
                      tags: ['schedule'],
                    },
                    {
                      name: 'command_notify',
                      location: 'form',
                      schema: {
                        _type: 'array',
                        title: 'Comma separated command_notify',
                        description:
                          '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                      },
                      tags: ['notification', 'groups'],
                    },
                    {
                      name: 'command_notify_failure',
                      location: 'form',
                      schema: {
                        _type: 'array',
                        title: 'Comma separated command_notify_failure',
                        description:
                          '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                      },
                      tags: ['notification', 'groups'],
                    },
                    {
                      name: 'key',
                      required: true,
                      location: 'form',
                      schema: {
                        _type: 'string',
                        title: 'key',
                        description: 'service key',
                      },
                      tags: ['service_lock'],
                    },
                  ],
                },
              },
              set: {
                _type: 'link',
                url: '/service/lock/set',
                action: 'post',
                encoding: 'application/x-www-form-urlencoded',
                description:
                  'Set a service lock key Execute `service clear` to ensure a key does not exist or `service wait` to wait for a key to be set ',
                fields: [
                  {
                    name: 'verbosity',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'verbosity',
                      description:
                        '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'debug',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'debug',
                      description:
                        '[@option_debug] run in debug mode with error tracebacks',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'display_width',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'display_width',
                      description:
                        '[@option_display_width] CLI display width <80>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'no_parallel',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'no_parallel',
                      description:
                        '[@option_no_parallel] disable parallel processing',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'push_queue',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'push_queue',
                      description:
                        '[@option_push_queue] run command in the background and follow execution results',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'async_exec',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'async_exec',
                      description:
                        '[@option_async_exec] return immediately and let queued command execution run in background',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'lock_id',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'lock_id',
                      description:
                        '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_error',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'lock_error',
                      description:
                        '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_timeout',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_timeout',
                      description:
                        '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_interval',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_interval',
                      description:
                        '[@option_lock_interval] command lock check interval in seconds <2>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'run_once',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'run_once',
                      description:
                        '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'schedule',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule',
                      description:
                        "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_begin',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_begin',
                      description:
                        "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_end',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_end',
                      description:
                        "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'command_notify',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify',
                      description:
                        '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'command_notify_failure',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify_failure',
                      description:
                        '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'key',
                    required: true,
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'key',
                      description: 'service key',
                    },
                    tags: ['service_lock'],
                  },
                ],
              },
              clear: {
                _type: 'link',
                url: '/service/lock/clear',
                action: 'post',
                encoding: 'application/x-www-form-urlencoded',
                description:
                  'Clear one or more service lock keys Execute `service set` to create a key or `service wait` to wait for a key to be set ',
                fields: [
                  {
                    name: 'verbosity',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'verbosity',
                      description:
                        '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'debug',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'debug',
                      description:
                        '[@option_debug] run in debug mode with error tracebacks',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'display_width',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'display_width',
                      description:
                        '[@option_display_width] CLI display width <80>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'no_parallel',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'no_parallel',
                      description:
                        '[@option_no_parallel] disable parallel processing',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'push_queue',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'push_queue',
                      description:
                        '[@option_push_queue] run command in the background and follow execution results',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'async_exec',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'async_exec',
                      description:
                        '[@option_async_exec] return immediately and let queued command execution run in background',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'lock_id',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'lock_id',
                      description:
                        '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_error',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'lock_error',
                      description:
                        '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_timeout',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_timeout',
                      description:
                        '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_interval',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_interval',
                      description:
                        '[@option_lock_interval] command lock check interval in seconds <2>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'run_once',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'run_once',
                      description:
                        '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'schedule',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule',
                      description:
                        "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_begin',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_begin',
                      description:
                        "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_end',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_end',
                      description:
                        "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'command_notify',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify',
                      description:
                        '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'command_notify_failure',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify_failure',
                      description:
                        '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'keys',
                    required: true,
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'JSON encoded keys',
                      description: 'one or more service keys',
                    },
                    tags: ['service_lock'],
                  },
                ],
              },
              wait: {
                _type: 'link',
                url: '/service/lock/wait',
                action: 'post',
                encoding: 'application/x-www-form-urlencoded',
                description:
                  'Wait for one or more service lock keys to be set Execute `service set` to create a key or `service clear` to ensure a key does not exist ',
                fields: [
                  {
                    name: 'verbosity',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'verbosity',
                      description:
                        '[@option_verbosity] verbosity level; 0=silent, 1=minimal, 2=normal, 3=verbose <2>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'debug',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'debug',
                      description:
                        '[@option_debug] run in debug mode with error tracebacks',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'display_width',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'display_width',
                      description:
                        '[@option_display_width] CLI display width <80>',
                    },
                    tags: ['display'],
                  },
                  {
                    name: 'no_parallel',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'no_parallel',
                      description:
                        '[@option_no_parallel] disable parallel processing',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'push_queue',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'push_queue',
                      description:
                        '[@option_push_queue] run command in the background and follow execution results',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'async_exec',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'async_exec',
                      description:
                        '[@option_async_exec] return immediately and let queued command execution run in background',
                    },
                    tags: ['system'],
                  },
                  {
                    name: 'lock_id',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'lock_id',
                      description:
                        '[@option_lock_id] command lock id to prevent simultanious duplicate execution',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_error',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'lock_error',
                      description:
                        '[@option_lock_error] raise an error and abort if commmand lock can not be established',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_timeout',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_timeout',
                      description:
                        '[@option_lock_timeout] command lock wait timeout in seconds <600>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'lock_interval',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'lock_interval',
                      description:
                        '[@option_lock_interval] command lock check interval in seconds <2>',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'run_once',
                    location: 'form',
                    schema: {
                      _type: 'boolean',
                      title: 'run_once',
                      description:
                        '[@option_run_once] persist the lock id as a state flag to prevent duplicate executions',
                    },
                    tags: ['lock'],
                  },
                  {
                    name: 'schedule',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule',
                      description:
                        "[@option_schedule] schedule in the form of timedelta '#D | #H | #M | #S', crontab 'M H Dm My Dw', or datetime 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_begin',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_begin',
                      description:
                        "[@option_schedule_begin] date to begin processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'schedule_end',
                    location: 'form',
                    schema: {
                      _type: 'string',
                      title: 'schedule_end',
                      description:
                        "[@option_schedule_end] date to end processing in form of 'YYYY-MM-DD HH:MM:SS'",
                    },
                    tags: ['schedule'],
                  },
                  {
                    name: 'command_notify',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify',
                      description:
                        '[@option_command_notify] user group names to notify of command results <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'command_notify_failure',
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'Comma separated command_notify_failure',
                      description:
                        '[@option_command_notify_failure] user group names to notify of command failures <> (comma separated)',
                    },
                    tags: ['notification', 'groups'],
                  },
                  {
                    name: 'keys',
                    required: true,
                    location: 'form',
                    schema: {
                      _type: 'array',
                      title: 'JSON encoded keys',
                      description: 'one or more service keys',
                    },
                    tags: ['service_lock'],
                  },
                  {
                    name: 'timeout',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'timeout',
                      description:
                        '[@option_timeout] wait timeout in seconds <600>',
                    },
                    tags: ['service_lock'],
                  },
                  {
                    name: 'interval',
                    location: 'form',
                    schema: {
                      _type: 'integer',
                      title: 'interval',
                      description:
                        '[@option_interval] poll interval during wait period in seconds <1>',
                    },
                    tags: ['service_lock'],
                  },
                ],
              },
            },
          },
        },
      },
    ];
  }
}

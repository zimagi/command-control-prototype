import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;
@Injectable({
  providedIn: 'root',
})
export class AppService {
  responsesList: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get responses(): any[] {
    return this.responsesList;
  }
  set responses(arr: any[]) {
    this.responsesList = arr;
  }
  getCommands() {
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
        group: {
          children: {
            _type: 'link',
            url: '/group/children',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'add children to a new or existing environment group TODO ',
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
                name: 'group_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_name',
                  description: 'parent group name',
                },
                tags: ['key'],
              },
              {
                name: 'group_child_names',
                required: true,
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded group_child_names',
                  description: 'one or more child group names',
                },
                tags: ['group'],
              },
              {
                name: 'group_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_provider_name',
                  description:
                    '[@option_group_provider_name] system group provider <classification>',
                },
                tags: ['provider'],
              },
            ],
          },
          list: {
            _type: 'link',
            url: '/group/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'List environment groups TODO ',
            resource: 'group',
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
                name: 'group_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated group_order',
                  description:
                    '[@option_group_order] group ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'group_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'group_limit',
                  description: '[@option_group_limit] group result limit <100>',
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
            url: '/group/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'get environment group information TODO ',
            resource: 'group',
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
                name: 'group_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_name',
                  description: 'group name',
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
            url: '/group/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'save an environment group TODO ',
            resource: 'group',
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
                name: 'group_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_provider_name',
                  description:
                    '[@option_group_provider_name] system group provider <classification>',
                },
                tags: ['provider'],
              },
              {
                name: 'group_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_name',
                  description: 'group name',
                },
                tags: ['key'],
              },
              {
                name: 'group_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded group_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: ---------------------------------------- provider: role ---------------------------------------- provider: classification ',
                },
                tags: ['fields'],
              },
              {
                name: 'parent_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'parent_name',
                  description: '[@option_parent_name] group name',
                },
                tags: ['relation'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/group/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'remove environment group TODO ',
            resource: 'group',
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
                name: 'group_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_name',
                  description: 'group name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/group/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'clear environment groups TODO ',
            resource: 'group',
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
        config: {
          list: {
            _type: 'link',
            url: '/config/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List configurations in current environment Returns infor for all currently defined configurations in the active environment. Data is returned as a series of key-value pairs. Includes ``Name`` of the config, the``Value Type``, the currently assigned ``Value``, and the ``Groups`` the configuration belongs to. ',
            resource: 'config',
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
                name: 'config_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated config_order',
                  description:
                    '[@option_config_order] config ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'config_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'config_limit',
                  description:
                    '[@option_config_limit] config result limit <100>',
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
            url: '/config/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Get environment configuration value Returns key-value pairs for a single provided configuration. Takes ``config _name``- the name of a single configuration. ',
            resource: 'config',
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
                name: 'config_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_name',
                  description: 'config name',
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
            url: '/config/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Save environment configuration value Assigns the provided value to specified configuration. Used to create and update configurations. Takes``config_name`` - name of the configuration to save, ``config_value`` - the value for the specified configuration. ',
            resource: 'config',
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
                name: 'config_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_provider_name',
                  description:
                    '[@option_config_provider_name] system config provider <base>',
                },
                tags: ['provider'],
              },
              {
                name: 'config_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_name',
                  description: 'config name',
                },
                tags: ['key'],
              },
              {
                name: 'config_value_type',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_value_type',
                  description:
                    '[@option_config_value_type] environment configuration type <str>',
                },
                tags: ['fields'],
              },
              {
                name: 'config_value',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_value',
                  description:
                    '[@option_config_value] environment configuration value',
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
            url: '/config/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing environment configuration Takes``config_name`` - name of the configuration to save. ',
            resource: 'config',
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
                name: 'config_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'config_name',
                  description: 'config name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/config/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Clear all existing environment configurations TODO ',
            resource: 'config',
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
        state: {
          list: {
            _type: 'link',
            url: '/state/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List states in current environment Takes `instance_search_query` - one or more search queries. ',
            resource: 'state',
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
                name: 'state_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated state_order',
                  description:
                    '[@option_state_order] state ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'state_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'state_limit',
                  description: '[@option_state_limit] state result limit <100>',
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
            url: '/state/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Get environment state value Takes `state_name` - the name of a state you want to get the value of. ',
            resource: 'state',
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
                name: 'state_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'state_name',
                  description: 'state name',
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
            url: '/state/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'state',
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
                name: 'state_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'state_name',
                  description: 'state name',
                },
                tags: ['key'],
              },
              {
                name: 'state_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded state_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: value encrypteddata ',
                },
                tags: ['fields'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/state/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing environment state Takes `state_name` - the name of a state you want to remove. ',
            resource: 'state',
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
                name: 'state_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'state_name',
                  description: 'state name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/state/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Clear all existing environment states Takes `instance_search_query` - one or more search queries. ',
            resource: 'state',
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
        module: {
          list: {
            _type: 'link',
            url: '/module/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'List modules in current environment TODO ',
            resource: 'module',
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
                name: 'module_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated module_order',
                  description:
                    '[@option_module_order] module ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'module_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'module_limit',
                  description:
                    '[@option_module_limit] module result limit <100>',
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
            url: '/module/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Get environment module information TODO ',
            resource: 'module',
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
          create: {
            _type: 'link',
            url: '/module/create',
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
                name: 'module_template',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_template',
                  description:
                    '[@option_module_template] Module template package name <standard>',
                },
                tags: ['template'],
              },
              {
                name: 'module_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_provider_name',
                  description:
                    '[@option_module_provider_name] Module provider name <local>',
                },
                tags: ['provider'],
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
          add: {
            _type: 'link',
            url: '/module/add',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Add a new module to current environment TODO ',
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
                name: 'module_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_provider_name',
                  description:
                    '[@option_module_provider_name] system module provider <git>',
                },
                tags: ['provider'],
              },
              {
                name: 'remote',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'remote',
                  description: 'Module remote location',
                },
                tags: ['module'],
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
              {
                name: 'module_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded module_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: reference string ---------------------------------------- provider: local provider options: use_template (@local_use_template | True) - Use a module template to create module if new template_package (@local_template_package | standard) - Module template package to use for module if new template_fields - Module template fields for Jinja2 template interpolation ---------------------------------------- provider: git provider requirements: provider options: reference (@git_reference | main) - Remote Git repository branch / reference username (@git_username | git) - Remote Git repository username password (@git_password) - Remote Git repository user password public_key (@git_public_key) - Remote Git repository user public key private_key (@git_private_key) - Remote Git repository user private key ',
                },
                tags: ['fields'],
              },
            ],
          },
          save: {
            _type: 'link',
            url: '/module/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Update an existing module in current environment TODO ',
            resource: 'module',
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
                name: 'module_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'module_provider_name',
                  description:
                    '[@option_module_provider_name] system module provider <git>',
                },
                tags: ['provider'],
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
                name: 'module_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded module_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: remote string reference string ---------------------------------------- provider: local provider options: use_template (@local_use_template | True) - Use a module template to create module if new template_package (@local_template_package | standard) - Module template package to use for module if new template_fields - Module template fields for Jinja2 template interpolation ---------------------------------------- provider: git provider requirements: remote - Git remote to clone and pull updates provider options: reference (@git_reference | main) - Remote Git repository branch / reference username (@git_username | git) - Remote Git repository username password (@git_password) - Remote Git repository user password public_key (@git_public_key) - Remote Git repository user public key private_key (@git_private_key) - Remote Git repository user private key ',
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
            url: '/module/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing module in current environment TODO ',
            resource: 'module',
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
            ],
          },
          clear: {
            _type: 'link',
            url: '/module/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Clear all existing modules in current environment TODO ',
            resource: 'module',
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
        },
        notification: {
          save: {
            _type: 'link',
            url: '/notification/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Save a command notification in current environment TODO ',
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
                name: 'group_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_provider_name',
                  description:
                    '[@option_group_provider_name] system group provider <classification>',
                },
                tags: ['provider'],
              },
              {
                name: 'notify_failure',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'notify_failure',
                  description:
                    '[@option_notify_failure] only notify groups on command failure',
                },
                tags: ['notification'],
              },
              {
                name: 'notify_command',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'notify_command',
                  description:
                    '[@option_notify_command] notification command with colons replacing spaces (ex: user:save)',
                },
                tags: ['notification'],
              },
              {
                name: 'notify_groups',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded notify_groups',
                  description:
                    '[@option_notify_groups] user group names to notify of command results <>',
                },
                tags: ['notification', 'groups'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/notification/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Remove an existing command notification TODO ',
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
                name: 'group_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'group_provider_name',
                  description:
                    '[@option_group_provider_name] system group provider <classification>',
                },
                tags: ['provider'],
              },
              {
                name: 'notify_failure',
                location: 'form',
                schema: {
                  _type: 'boolean',
                  title: 'notify_failure',
                  description:
                    '[@option_notify_failure] only notify groups on command failure',
                },
                tags: ['notification'],
              },
              {
                name: 'notify_command',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'notify_command',
                  description:
                    '[@option_notify_command] notification command with colons replacing spaces (ex: user:save)',
                },
                tags: ['notification'],
              },
              {
                name: 'notify_groups',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded notify_groups',
                  description:
                    '[@option_notify_groups] user group names to notify of command results <>',
                },
                tags: ['notification', 'groups'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/notification/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Clear all existing command notifications TODO ',
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
            ],
          },
          list: {
            _type: 'link',
            url: '/notification/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List command notifications in current environment TODO ',
            resource: 'notification',
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
                name: 'notification_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated notification_order',
                  description:
                    '[@option_notification_order] notification ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'notification_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'notification_limit',
                  description:
                    '[@option_notification_limit] notification result limit <100>',
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
        },
        schedule: {
          list: {
            _type: 'link',
            url: '/schedule/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List command schedules in current environment Takes``field`` ``subfield`` -- a list of fields and subfields to display. ',
            resource: 'scheduled_task',
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
                name: 'scheduled_task_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated scheduled_task_order',
                  description:
                    '[@option_scheduled_task_order] scheduled_task ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'scheduled_task_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'scheduled_task_limit',
                  description:
                    '[@option_scheduled_task_limit] scheduled_task result limit <100>',
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
            url: '/schedule/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Get environment command schedule Takes ``scheduled_task_name`` - the name of the scheduled tasks. ',
            resource: 'scheduled_task',
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
                name: 'scheduled_task_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'scheduled_task_name',
                  description: 'scheduled_task name',
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
          remove: {
            _type: 'link',
            url: '/schedule/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing command schedule Takes ``scheduled_task_name`` - the name of the scheduled tasks. ',
            resource: 'scheduled_task',
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
                name: 'scheduled_task_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'scheduled_task_name',
                  description: 'scheduled_task name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/schedule/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Clear all existing command schedules Deletes all of the existing command schedules within the current active environment. ',
            resource: 'scheduled_task',
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
        db: {
          pull: {
            _type: 'link',
            url: '/db/pull',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Download and install remote environment database on client TODO ',
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
                name: 'db_packages',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded db_packages',
                  description:
                    '[@option_db_packages] one or more database package names <all>',
                },
                tags: ['database'],
              },
            ],
          },
          push: {
            _type: 'link',
            url: '/db/push',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Transfer and install local environment database on server TODO ',
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
                name: 'db_packages',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded db_packages',
                  description:
                    '[@option_db_packages] one or more database package names <all>',
                },
                tags: ['database'],
              },
            ],
          },
        },
        cache: {
          clear: {
            _type: 'link',
            url: '/cache/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Clear the Zimagi page cache TODO ',
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
            ],
          },
        },
        log: {
          list: {
            _type: 'link',
            url: '/log/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'List command log entries TODO ',
            resource: 'log',
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
                name: 'log_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated log_order',
                  description:
                    '[@option_log_order] log ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'log_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'log_limit',
                  description: '[@option_log_limit] log result limit <100>',
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
            url: '/log/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Get information for a command execution TODO ',
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
                name: 'log_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'log_name',
                  description: 'log name',
                },
                tags: ['key'],
              },
              {
                name: 'poll_interval',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'poll_interval',
                  description:
                    '[@option_poll_interval] log message check interval <5>',
                },
                tags: ['log'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/log/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Remove an existing command log entry TODO ',
            resource: 'log',
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
                name: 'log_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'log_name',
                  description: 'log name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/log/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Clear all existing command log entries TODO ',
            resource: 'log',
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
          abort: {
            _type: 'link',
            url: '/log/abort',
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
                name: 'log_names',
                required: true,
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded log_names',
                  description: 'one or more log names',
                },
                tags: ['key', 'keys'],
              },
            ],
          },
          rerun: {
            _type: 'link',
            url: '/log/rerun',
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
                name: 'log_names',
                required: true,
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'JSON encoded log_names',
                  description: 'one or more log names',
                },
                tags: ['key', 'keys'],
              },
            ],
          },
        },
        data: {
          list: {
            _type: 'link',
            url: '/data/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'List datasets in current environment Returns information for all currently defined datasets in the active environment. Data is returned as a series of key-value pairs. Includes ``Name`` of the dataset, query configurations, and the ``Groups`` the dataset belongs to. ',
            resource: 'dataset',
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
                name: 'dataset_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated dataset_order',
                  description:
                    '[@option_dataset_order] dataset ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'dataset_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'dataset_limit',
                  description:
                    '[@option_dataset_limit] dataset result limit <100>',
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
            url: '/data/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Get environment dataset Returns key-value pairs for a single provided dataset. Takes ``dataset_name``- the name of a single dataset. ',
            resource: 'dataset',
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
                name: 'dataset_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'dataset_name',
                  description: 'dataset name',
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
            url: '/data/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Save environment dataset Assigns the provided value to specified dataset. Used to create and update datasets. Takes``dataset_name`` - name of the dataset to save, ``dataset_value`` - the value for the specified dataset. ',
            resource: 'dataset',
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
                name: 'dataset_provider_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'dataset_provider_name',
                  description:
                    '[@option_dataset_provider_name] system dataset provider <collection>',
                },
                tags: ['provider'],
              },
              {
                name: 'dataset_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'dataset_name',
                  description: 'dataset name',
                },
                tags: ['key'],
              },
              {
                name: 'dataset_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded dataset_fields',
                  description:
                    "fields as key value pairs ---------------------------------------- model requirements: model options: ---------------------------------------- provider: collection provider requirements: query_fields - Collection of query types and fields in TYPE:FIELD format provider options: required_types - Comma separated list of required query types index_field - Dataframe index field merge_fields - Dataframe merge fields remove_fields - Dataframe remove fields column_prefix (True) - Whether or not to prefix the data type to the column name in the resulting dataset processors - List of processing function plugin providers to run on resulting dataset (in order) ---------------------------------------- provider: period provider requirements: query_fields - Collection of query types and fields in TYPE:FIELD format provider options: start_time (@dataset_start_time) - Start time in the form of 'YYY-MM-DD [HH:MM:SS]' end_time (@dataset_end_time) - End time in the form of 'YYY-MM-DD [HH:MM:SS]' unit_type (@dataset_unit_type | days) - Unit type for units to query units (@dataset_units) - Number of units to query in the form of [-]NUM last_known_value (@dataset_last_known_value | False) - Whether or not to return last known value even if before start time forward_fill (@dataset_forward_fill | False) - Whether or not to fill all null values with previous values resample (@dataset_resample) - Resample the data as another time frequency resample_summary (@dataset_resample_summary | last) - Resample summary operation of the data required_types - Comma separated list of required query types index_field - Dataframe index field merge_fields - Dataframe merge fields remove_fields - Dataframe remove fields column_prefix (True) - Whether or not to prefix the data type to the column name in the resulting dataset processors - List of processing function plugin providers to run on resulting dataset (in order) ",
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
            url: '/data/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description:
              'Remove an existing environment dataset Takes``dataset_name`` - name of the dataset to remove. ',
            resource: 'dataset',
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
                name: 'dataset_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'dataset_name',
                  description: 'dataset name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/data/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: 'Clear all existing environment datasets TODO ',
            resource: 'dataset',
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
        location: {
          list: {
            _type: 'link',
            url: '/location/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'location',
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
                name: 'location_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated location_order',
                  description:
                    '[@option_location_order] location ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'location_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'location_limit',
                  description:
                    '[@option_location_limit] location result limit <100>',
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
            url: '/location/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'location',
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
                name: 'location_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'location_name',
                  description: 'location name',
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
            url: '/location/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'location',
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
                name: 'location_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'location_name',
                  description: 'location name',
                },
                tags: ['key'],
              },
              {
                name: 'location_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded location_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: country string city string model options: province string longitude float latitude float ',
                },
                tags: ['fields'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/location/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'location',
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
                name: 'location_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'location_name',
                  description: 'location name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/location/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'location',
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
        organization: {
          list: {
            _type: 'link',
            url: '/organization/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'organization',
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
                name: 'organization_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated organization_order',
                  description:
                    '[@option_organization_order] organization ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'organization_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'organization_limit',
                  description:
                    '[@option_organization_limit] organization result limit <100>',
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
            url: '/organization/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'organization',
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
                name: 'organization_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'organization_name',
                  description: 'organization name',
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
            url: '/organization/save',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'organization',
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
                name: 'organization_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'organization_name',
                  description: 'organization name',
                },
                tags: ['key'],
              },
              {
                name: 'organization_fields',
                location: 'form',
                schema: {
                  _type: 'object',
                  title: 'JSON encoded organization_fields',
                  description:
                    'fields as key value pairs ---------------------------------------- model requirements: model options: ',
                },
                tags: ['fields'],
              },
              {
                name: 'parent_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'parent_name',
                  description: '[@option_parent_name] group name',
                },
                tags: ['relation'],
              },
              {
                name: 'locations_names',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated locations_names',
                  description:
                    '[@option_locations_names] one or more location names <> (comma separated)',
                },
                tags: ['relation'],
              },
            ],
          },
          remove: {
            _type: 'link',
            url: '/organization/remove',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'organization',
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
                name: 'organization_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'organization_name',
                  description: 'organization name',
                },
                tags: ['key'],
              },
            ],
          },
          clear: {
            _type: 'link',
            url: '/organization/clear',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'organization',
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
        job: {
          list: {
            _type: 'link',
            url: '/job/list',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'job',
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
                name: 'job_order',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated job_order',
                  description:
                    '[@option_job_order] job ordering fields (~field for desc) <> (comma separated)',
                },
                tags: ['list', 'ordering'],
              },
              {
                name: 'job_limit',
                location: 'form',
                schema: {
                  _type: 'integer',
                  title: 'job_limit',
                  description: '[@option_job_limit] job result limit <100>',
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
            url: '/job/get',
            action: 'post',
            encoding: 'application/x-www-form-urlencoded',
            description: ' ',
            resource: 'job',
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
                name: 'job_source_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'job_source_name',
                  description: '[@option_job_source_name] job_source name',
                },
                tags: ['scope'],
              },
              {
                name: 'job_name',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'job_name',
                  description: 'job name',
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
          source: {
            list: {
              _type: 'link',
              url: '/job/source/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_source',
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
                  name: 'job_source_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_source_order',
                    description:
                      '[@option_job_source_order] job_source ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_source_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_source_limit',
                    description:
                      '[@option_job_source_limit] job_source result limit <100>',
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
              url: '/job/source/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_source',
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
                  name: 'job_source_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: 'job_source name',
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
              url: '/job/source/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_source',
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
                  name: 'job_source_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: 'job_source name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_source_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_source_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/source/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_source',
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
                  name: 'job_source_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: 'job_source name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/source/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_source',
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
          classification: {
            list: {
              _type: 'link',
              url: '/job/classification/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_classification',
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
                  name: 'job_classification_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_classification_order',
                    description:
                      '[@option_job_classification_order] job_classification ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_classification_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_classification_limit',
                    description:
                      '[@option_job_classification_limit] job_classification result limit <100>',
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
              url: '/job/classification/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_classification',
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
                  name: 'job_classification_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_classification_name',
                    description: 'job_classification name',
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
              url: '/job/classification/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_classification',
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
                  name: 'job_classification_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_classification_name',
                    description: 'job_classification name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_classification_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_classification_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: name string model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/classification/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_classification',
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
                  name: 'job_classification_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_classification_name',
                    description: 'job_classification name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/classification/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_classification',
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
          offering_type: {
            list: {
              _type: 'link',
              url: '/job/offering_type/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_offering_type',
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
                  name: 'job_offering_type_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_offering_type_order',
                    description:
                      '[@option_job_offering_type_order] job_offering_type ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_offering_type_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_offering_type_limit',
                    description:
                      '[@option_job_offering_type_limit] job_offering_type result limit <100>',
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
              url: '/job/offering_type/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_offering_type',
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
                  name: 'job_offering_type_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_offering_type_name',
                    description: 'job_offering_type name',
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
              url: '/job/offering_type/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_offering_type',
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
                  name: 'job_offering_type_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_offering_type_name',
                    description: 'job_offering_type name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_offering_type_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_offering_type_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: name string model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/offering_type/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_offering_type',
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
                  name: 'job_offering_type_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_offering_type_name',
                    description: 'job_offering_type name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/offering_type/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_offering_type',
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
          schedule: {
            list: {
              _type: 'link',
              url: '/job/schedule/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'List command schedules in current environment Takes``field`` ``subfield`` -- a list of fields and subfields to display. ',
              resource: 'job_schedule',
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
                  name: 'job_schedule_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_schedule_order',
                    description:
                      '[@option_job_schedule_order] job_schedule ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_schedule_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_schedule_limit',
                    description:
                      '[@option_job_schedule_limit] job_schedule result limit <100>',
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
              url: '/job/schedule/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Get environment command schedule Takes ``scheduled_task_name`` - the name of the scheduled tasks. ',
              resource: 'job_schedule',
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
                  name: 'job_schedule_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_schedule_name',
                    description: 'job_schedule name',
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
              url: '/job/schedule/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_schedule',
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
                  name: 'job_schedule_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_schedule_name',
                    description: 'job_schedule name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_schedule_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_schedule_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: name string model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/schedule/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Remove an existing command schedule Takes ``scheduled_task_name`` - the name of the scheduled tasks. ',
              resource: 'job_schedule',
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
                  name: 'job_schedule_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_schedule_name',
                    description: 'job_schedule name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/schedule/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description:
                'Clear all existing command schedules Deletes all of the existing command schedules within the current active environment. ',
              resource: 'job_schedule',
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
          remuneration: {
            list: {
              _type: 'link',
              url: '/job/remuneration/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_remuneration',
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
                  name: 'job_remuneration_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_remuneration_order',
                    description:
                      '[@option_job_remuneration_order] job_remuneration ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_remuneration_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_remuneration_limit',
                    description:
                      '[@option_job_remuneration_limit] job_remuneration result limit <100>',
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
              url: '/job/remuneration/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_remuneration',
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
                  name: 'job_remuneration_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_remuneration_name',
                    description: 'job_remuneration name',
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
              url: '/job/remuneration/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_remuneration',
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
                  name: 'job_remuneration_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_remuneration_name',
                    description: 'job_remuneration name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_remuneration_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_remuneration_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: interval string min_range string max_range string model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/remuneration/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_remuneration',
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
                  name: 'job_remuneration_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_remuneration_name',
                    description: 'job_remuneration name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/remuneration/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_remuneration',
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
          grade: {
            list: {
              _type: 'link',
              url: '/job/grade/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_grade',
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
                  name: 'job_grade_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_grade_order',
                    description:
                      '[@option_job_grade_order] job_grade ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'job_grade_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'job_grade_limit',
                    description:
                      '[@option_job_grade_limit] job_grade result limit <100>',
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
              url: '/job/grade/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_grade',
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
                  name: 'job_grade_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_grade_name',
                    description: 'job_grade name',
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
              url: '/job/grade/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_grade',
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
                  name: 'job_grade_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_grade_name',
                    description: 'job_grade name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'job_grade_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded job_grade_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: name string model options: ',
                  },
                  tags: ['fields'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/grade/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_grade',
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
                  name: 'job_grade_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_grade_name',
                    description: 'job_grade name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/grade/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'job_grade',
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
          usa: {
            list: {
              _type: 'link',
              url: '/job/usa/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'usa_job',
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
                  name: 'usa_job_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated usa_job_order',
                    description:
                      '[@option_usa_job_order] usa_job ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'usa_job_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'usa_job_limit',
                    description:
                      '[@option_usa_job_limit] usa_job result limit <100>',
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
              url: '/job/usa/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'usa_job',
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
                  name: 'job_source_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: '[@option_job_source_name] job_source name',
                  },
                  tags: ['scope'],
                },
                {
                  name: 'usa_job_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'usa_job_name',
                    description: 'usa_job name',
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
              url: '/job/usa/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'usa_job',
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
                  name: 'job_source_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: '[@option_job_source_name] job_source name',
                  },
                  tags: ['scope'],
                },
                {
                  name: 'usa_job_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'usa_job_name',
                    description: 'usa_job name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'usa_job_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded usa_job_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: url url job_ptr onetoone model options: description text qualifications text evaluations text requirements text required_documents text duties text travel_requirements text education text benefits text benefits_url url start_date datetime end_date datetime publication_date datetime application_close_date datetime how_to_apply text what_to_expect text other_information text telework_eligible boolean supervisory_status boolean drug_test_required boolean relocation_expenses_reimbursed boolean openings integer who_may_apply string low_grade string high_grade string promotion_potential string organization_codes string vendor string service_type string security_clearance_required boolean security_clearance string ',
                  },
                  tags: ['fields'],
                },
                {
                  name: 'organization_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'organization_name',
                    description:
                      '[@option_organization_name] organization name',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'department_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'department_name',
                    description: '[@option_department_name] organization name',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'job_classifications_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_classifications_names',
                    description:
                      '[@option_job_classifications_names] one or more job_classification names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'locations_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated locations_names',
                    description:
                      '[@option_locations_names] one or more location names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'job_grades_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_grades_names',
                    description:
                      '[@option_job_grades_names] one or more job_grade names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'job_offering_types_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_offering_types_names',
                    description:
                      '[@option_job_offering_types_names] one or more job_offering_type names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'job_remunerations_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_remunerations_names',
                    description:
                      '[@option_job_remunerations_names] one or more job_remuneration names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
                {
                  name: 'job_schedules_names',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated job_schedules_names',
                    description:
                      '[@option_job_schedules_names] one or more job_schedule names <> (comma separated)',
                  },
                  tags: ['relation'],
                },
              ],
            },
            remove: {
              _type: 'link',
              url: '/job/usa/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'usa_job',
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
                  name: 'job_source_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: '[@option_job_source_name] job_source name',
                  },
                  tags: ['scope'],
                },
                {
                  name: 'usa_job_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'usa_job_name',
                    description: 'usa_job name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/job/usa/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'usa_job',
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
                {
                  name: 'job_source_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'job_source_name',
                    description: '[@option_job_source_name] job_source name',
                  },
                  tags: ['scope'],
                },
              ],
            },
          },
        },
        remote: {
          predict: {
            _type: 'link',
            url: '/remote/predict',
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
                name: 'job_text',
                required: true,
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'job_text',
                  description: 'Job text',
                },
              },
              {
                name: 'remote_ai_model_name',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'remote_ai_model_name',
                  description:
                    '[@option_remote_ai_model_name] remote_ai_model name',
                },
                tags: ['key'],
              },
              {
                name: 'model_groups',
                location: 'form',
                schema: {
                  _type: 'array',
                  title: 'Comma separated model_groups',
                  description:
                    '[@option_model_groups] Group names for filtering relevant models <> (comma separated)',
                },
              },
              {
                name: 'training_percentage_min',
                location: 'form',
                schema: {
                  _type: 'number',
                  title: 'training_percentage_min',
                  description:
                    '[@option_training_percentage_min] Minimum training percentage allowed for comparing model performance <0.5>',
                },
              },
              {
                name: 'training_percentage_max',
                location: 'form',
                schema: {
                  _type: 'number',
                  title: 'training_percentage_max',
                  description:
                    '[@option_training_percentage_max] Maximum training percentage allowed for comparing model performance <0.8>',
                },
              },
              {
                name: 'metric_field',
                location: 'form',
                schema: {
                  _type: 'string',
                  title: 'metric_field',
                  description:
                    '[@option_metric_field] Metric field for optimizing prediction model <f1_score>',
                },
              },
            ],
          },
          prediction: {
            list: {
              _type: 'link',
              url: '/remote/prediction/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_prediction',
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
                  name: 'remote_ai_prediction_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated remote_ai_prediction_order',
                    description:
                      '[@option_remote_ai_prediction_order] remote_ai_prediction ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'remote_ai_prediction_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'remote_ai_prediction_limit',
                    description:
                      '[@option_remote_ai_prediction_limit] remote_ai_prediction result limit <100>',
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
              url: '/remote/prediction/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_prediction',
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
                  name: 'remote_ai_model_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description:
                      '[@option_remote_ai_model_name] remote_ai_model name',
                  },
                  tags: ['scope'],
                },
                {
                  name: 'remote_ai_prediction_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_prediction_name',
                    description: 'remote_ai_prediction name',
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
            remove: {
              _type: 'link',
              url: '/remote/prediction/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_prediction',
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
                  name: 'remote_ai_model_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description:
                      '[@option_remote_ai_model_name] remote_ai_model name',
                  },
                  tags: ['scope'],
                },
                {
                  name: 'remote_ai_prediction_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_prediction_name',
                    description: 'remote_ai_prediction name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/remote/prediction/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_prediction',
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
                {
                  name: 'remote_ai_model_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description:
                      '[@option_remote_ai_model_name] remote_ai_model name',
                  },
                  tags: ['scope'],
                },
              ],
            },
          },
          model: {
            list: {
              _type: 'link',
              url: '/remote/model/list',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_model',
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
                  name: 'remote_ai_model_order',
                  location: 'form',
                  schema: {
                    _type: 'array',
                    title: 'Comma separated remote_ai_model_order',
                    description:
                      '[@option_remote_ai_model_order] remote_ai_model ordering fields (~field for desc) <> (comma separated)',
                  },
                  tags: ['list', 'ordering'],
                },
                {
                  name: 'remote_ai_model_limit',
                  location: 'form',
                  schema: {
                    _type: 'integer',
                    title: 'remote_ai_model_limit',
                    description:
                      '[@option_remote_ai_model_limit] remote_ai_model result limit <100>',
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
              url: '/remote/model/get',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_model',
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
                  name: 'remote_ai_model_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description: 'remote_ai_model name',
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
              url: '/remote/model/save',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_model',
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
                  name: 'remote_ai_model_provider_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_provider_name',
                    description:
                      '[@option_remote_ai_model_provider_name] system remote_ai_model provider <tdidf_svc>',
                  },
                  tags: ['provider'],
                },
                {
                  name: 'remote_ai_model_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description: 'remote_ai_model name',
                  },
                  tags: ['key'],
                },
                {
                  name: 'remote_ai_model_fields',
                  location: 'form',
                  schema: {
                    _type: 'object',
                    title: 'JSON encoded remote_ai_model_fields',
                    description:
                      'fields as key value pairs ---------------------------------------- model requirements: model options: training_percentage float (0.7) precision float recall float f1_score float ---------------------------------------- provider: tdidf_svc provider options: kernel (linear) - SVC classifier kernel type random_state (1234) - Random state for the SVC classifier predictor (predictor) - Name of the prediction field within given dataset target (target) - Name of the prediction target field within given dataset ',
                  },
                  tags: ['fields'],
                },
                {
                  name: 'dataset_name',
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'dataset_name',
                    description: '[@option_dataset_name] dataset name',
                  },
                  tags: ['relation'],
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
              url: '/remote/model/remove',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_model',
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
                  name: 'remote_ai_model_name',
                  required: true,
                  location: 'form',
                  schema: {
                    _type: 'string',
                    title: 'remote_ai_model_name',
                    description: 'remote_ai_model name',
                  },
                  tags: ['key'],
                },
              ],
            },
            clear: {
              _type: 'link',
              url: '/remote/model/clear',
              action: 'post',
              encoding: 'application/x-www-form-urlencoded',
              description: ' ',
              resource: 'remote_ai_model',
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
        },
        import: {
          _type: 'link',
          url: '/import',
          action: 'post',
          encoding: 'application/x-www-form-urlencoded',
          description:
            'Import data objects from specifications Makes all data objects defined by provided specifications available. Requires ``import_names`` - The names of one or more specifications. ',
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
              name: 'import_names',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'JSON encoded import_names',
                description:
                  '[@option_import_names] one or more import specification names <>',
              },
              tags: ['import'],
            },
            {
              name: 'tags',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'Comma separated tags',
                description:
                  '[@option_tags] one or more import specification tags <> (comma separated)',
              },
              tags: ['import'],
            },
            {
              name: 'ignore_requirements',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'ignore_requirements',
                description:
                  '[@option_ignore_requirements] ignore requirements when not listed in import_names',
              },
              tags: ['import'],
            },
            {
              name: 'show_spec',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'show_spec',
                description:
                  '[@option_show_spec] display selected import specifications',
              },
              tags: ['import', 'test'],
            },
          ],
        },
        calculate: {
          _type: 'link',
          url: '/calculate',
          action: 'post',
          encoding: 'application/x-www-form-urlencoded',
          description: 'Calculate data objects from specifications TODO ',
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
              name: 'calculation_names',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'JSON encoded calculation_names',
                description:
                  '[@option_calculation_names] one or more calculation specification names <>',
              },
              tags: ['calculation'],
            },
            {
              name: 'tags',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'Comma separated tags',
                description:
                  '[@option_tags] one or more calculation specification tags <> (comma separated)',
              },
              tags: ['calculation'],
            },
            {
              name: 'ignore_requirements',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'ignore_requirements',
                description:
                  '[@option_ignore_requirements] ignore requirements when not listed in calculation_names',
              },
              tags: ['calculation'],
            },
            {
              name: 'show_spec',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'show_spec',
                description:
                  '[@option_show_spec] display selected calculation specifications',
              },
              tags: ['calculation', 'test'],
            },
            {
              name: 'reset',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'reset',
                description: '[@option_reset] reset all calculations',
              },
              tags: ['calculation'],
            },
          ],
        },
        task: {
          _type: 'link',
          url: '/task',
          action: 'post',
          encoding: 'application/x-www-form-urlencoded',
          description:
            'Execute an existing module task in current environment TODO ',
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
              name: 'task_name',
              required: true,
              location: 'form',
              schema: {
                _type: 'string',
                title: 'task_name',
                description: 'task name',
              },
              tags: ['key'],
            },
            {
              name: 'task_fields',
              location: 'form',
              schema: {
                _type: 'object',
                title: 'JSON encoded task_fields',
                description: ' fields as key value pairs ',
              },
              tags: ['fields'],
            },
          ],
        },
        run: {
          _type: 'link',
          url: '/run',
          action: 'post',
          encoding: 'application/x-www-form-urlencoded',
          description:
            'Run an existing module profile in current environment TODO ',
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
              name: 'ignore_missing',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'ignore_missing',
                description:
                  '[@option_ignore_missing] ignore missing profile instead of throwing an error',
              },
              tags: ['profile'],
            },
            {
              name: 'profile_components',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'Comma separated profile_components',
                description:
                  '[@option_profile_components] one or more module profile component names <> (comma separated)',
              },
              tags: ['profile'],
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
              name: 'profile_name',
              required: true,
              location: 'form',
              schema: {
                _type: 'string',
                title: 'profile_name',
                description: 'profile name',
              },
              tags: ['key'],
            },
            {
              name: 'profile_config_fields',
              location: 'form',
              schema: {
                _type: 'object',
                title: 'JSON encoded profile_config_fields',
                description: ' fields as key value pairs ',
              },
              tags: ['profile'],
            },
          ],
        },
        destroy: {
          _type: 'link',
          url: '/destroy',
          action: 'post',
          encoding: 'application/x-www-form-urlencoded',
          description:
            'Destroy all resources from a module profile in current environment TODO ',
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
              name: 'ignore_missing',
              location: 'form',
              schema: {
                _type: 'boolean',
                title: 'ignore_missing',
                description:
                  '[@option_ignore_missing] ignore missing profile instead of throwing an error',
              },
              tags: ['profile'],
            },
            {
              name: 'profile_components',
              location: 'form',
              schema: {
                _type: 'array',
                title: 'Comma separated profile_components',
                description:
                  '[@option_profile_components] one or more module profile component names <> (comma separated)',
              },
              tags: ['profile'],
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
              name: 'profile_name',
              required: true,
              location: 'form',
              schema: {
                _type: 'string',
                title: 'profile_name',
                description: 'profile name',
              },
              tags: ['key'],
            },
            {
              name: 'profile_config_fields',
              location: 'form',
              schema: {
                _type: 'object',
                title: 'JSON encoded profile_config_fields',
                description: ' fields as key value pairs ',
              },
              tags: ['profile'],
            },
          ],
        },
      },
    ];
  }
}

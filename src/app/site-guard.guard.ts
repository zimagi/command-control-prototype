import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommandsComponent } from './commands/commands.component';

@Injectable({
  providedIn: 'root',
})
export class SiteGuardGuard implements CanDeactivate<CommandsComponent> {
  canDeactivate(
    component: CommandsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextSate?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.allowRedirect === false) {
      // Angular bug! The stack navigation with candeactivate guard
      // messes up all the navigation stack...
      // see here: https://github.com/angular/angular/issues/13586#issuecomment-402250031
      // this.location.go(currentState.url);

      if (
        window.confirm('If you RELOAD you will be automatically logged out.')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    return true;
  }
}

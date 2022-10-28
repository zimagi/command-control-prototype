import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
declare let $: any;
@Component({
  selector: 'app-commands-header',
  templateUrl: './commands-header.component.html',
  styleUrls: ['./commands-header.component.scss'],
})
export class CommandsHeaderComponent implements OnInit {
  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
  toggleCommands() {
    if ($('#main').hasClass('show')) {
      $('#main').removeClass('show');
    } else {
      $('#main').addClass('show');
    }
  }
}

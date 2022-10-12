import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';

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
}

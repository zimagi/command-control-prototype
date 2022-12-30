import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-commands-header',
  templateUrl: './commands-header.component.html',
  styleUrls: ['./commands-header.component.scss'],
})
export class CommandsHeaderComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  logout() {
    this.appService.logged = true;
    //this.appService.logout();
  }
  toggleCommands(){
    //
    return false; 
  }
}

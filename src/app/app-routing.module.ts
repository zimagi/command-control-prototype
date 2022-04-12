import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands/commands.component';
import { EditCommandComponent } from './commands/edit-command/edit-command.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

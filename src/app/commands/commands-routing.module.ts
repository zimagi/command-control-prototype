import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { EditCommandComponent } from './edit-command/edit-command.component';

const routes: Routes = [
  {
    path: 'commands',
    component: CommandsComponent,
    children: [
      { path: '', component: CommandsComponent },
      { path: ':command/:action', component: EditCommandComponent },
      { path: ':command', component: EditCommandComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsRoutingModule {}

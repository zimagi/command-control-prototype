import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { EditCommandNewComponent } from './edit-command-new/edit-command-new.component';
import { EditCommandComponent } from './edit-command/edit-command.component';
import { EditCommand2Component } from './edit-command2/edit-command2.component';

const routes: Routes = [
  {
    path: 'commands',
    component: CommandsComponent,
    children: [{ path: ':command', component: EditCommandNewComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsRoutingModule {}

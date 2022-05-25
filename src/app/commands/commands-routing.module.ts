import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { EditCommandNewComponent } from './edit-command-new/edit-command-new.component';

const routes: Routes = [
  {
    path: 'commands',
    component: CommandsComponent,

    children: [
      {
        path: ':command',
        component: EditCommandNewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsRoutingModule {}

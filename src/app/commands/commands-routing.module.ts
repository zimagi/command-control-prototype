import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteGuardGuard } from '../site-guard.guard';
import { CommandsComponent } from './commands.component';
import { EditCommandNewComponent } from './edit-command-new/edit-command-new.component';

const routes: Routes = [
  {
    path: 'commands',
    canDeactivate: [SiteGuardGuard],
    component: CommandsComponent,

    children: [
      {
        path: ':command',
        canDeactivate: [SiteGuardGuard],
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

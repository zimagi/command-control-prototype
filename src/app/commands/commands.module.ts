import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandsRoutingModule } from './commands-routing.module';
import { EditCommandComponent } from './edit-command/edit-command.component';
import { MaterialModule } from '../shared/material/material.module';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  declarations: [EditCommandComponent, SafeHtmlPipe],
  imports: [CommonModule, CommandsRoutingModule, MaterialModule],
})
export class CommandsModule {}

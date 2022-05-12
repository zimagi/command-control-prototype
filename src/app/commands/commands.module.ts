import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandsRoutingModule } from './commands-routing.module';
import { EditCommandComponent } from './edit-command/edit-command.component';
import { MaterialModule } from '../shared/material/material.module';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { EditCommand2Component } from './edit-command2/edit-command2.component';
import { DynamicFormInputComponent } from '../shared/dynamic-form-input/dynamic-form-input.component';
import { DynamcFormComponent } from './dynamc-form/dynamc-form.component';
import { EditCommandNewComponent } from './edit-command-new/edit-command-new.component';
import { ArrayInputComponent } from '../shared/dynamic-form-input/array-input/array-input.component';

@NgModule({
  declarations: [
    EditCommandComponent,
    SafeHtmlPipe,
    EditCommand2Component,
    DynamicFormInputComponent,
    ArrayInputComponent,
    DynamcFormComponent,
    EditCommandNewComponent,
  ],
  imports: [
    CommonModule,
    CommandsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommandsModule {}

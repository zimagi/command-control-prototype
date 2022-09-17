import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandsRoutingModule } from './commands-routing.module';

import { MaterialModule } from '../shared/material/material.module';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { DynamicFormInputComponent } from '../shared/dynamic-form-input/dynamic-form-input.component';
import { DynamcFormComponent } from './dynamc-form/dynamc-form.component';
import { EditCommandComponent } from './edit-command/edit-command.component';
import { ArrayInputComponent } from '../shared/dynamic-form-input/array-input/array-input.component';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    DynamicFormInputComponent,
    ArrayInputComponent,
    DynamcFormComponent,
    EditCommandComponent,
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

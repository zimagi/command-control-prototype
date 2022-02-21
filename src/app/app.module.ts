import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material/material.module';
import { CommandsComponent } from './commands/commands.component';
import { CommandsHeaderComponent } from './shared/commands-header/commands-header.component';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommandsModule } from './commands/commands.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommandsComponent,
    CommandsHeaderComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommandsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

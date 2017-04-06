import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppConfig } from './config/app.config';
import { AuthService, AuthGuardService, LoggerService, LoaderService, ModalCommunicationService, CommunicationService, DataService } from './common/api';

import { SharedModule } from './common/shared';

import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [AppConfig], multi: true },
    AuthService,
    AuthGuardService,
    LoggerService,
    LoaderService,
    ModalCommunicationService,
    CommunicationService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(config: AppConfig){
  return function load(){
    config.load();
  }
}
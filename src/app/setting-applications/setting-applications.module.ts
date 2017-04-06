import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingApplicationsRoutingModule } from './setting-applications-routing.module';
import { SettingApplicationsComponent } from './setting-applications.component';
import { SettingApplicationsGridComponent } from './setting-applications.component';

import { PanelModule, DataTableModule, SharedModule } from 'primeng/primeng';


import { SettingApplicationsService } from './setting-applications.service';

@NgModule({
  imports: [
    CommonModule,
    SettingApplicationsRoutingModule,
    PanelModule,
    DataTableModule,
    SharedModule
  ],
  exports: [
  ],
  declarations: [
  	SettingApplicationsComponent,
  	SettingApplicationsGridComponent
  ],
  providers: [
  	SettingApplicationsService
  ]
})
export class SettingApplicationsModule { }

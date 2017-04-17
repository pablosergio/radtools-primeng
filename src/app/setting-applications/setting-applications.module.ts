import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SettingApplicationsRoutingModule } from './setting-applications-routing.module';
import { SettingApplicationsComponent } from './setting-applications.component';
import { SettingApplicationsGridComponent, SettingApplicationsFormComponent } from './setting-applications.component';

import { PanelModule, DataTableModule, DropdownModule, SplitButtonModule } from 'primeng/primeng';
import { SharedModule } from '../common/shared';

import { SettingApplicationsService } from './setting-applications.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingApplicationsRoutingModule,
    PanelModule,
    DataTableModule,
    DropdownModule,
    SplitButtonModule,    
    SharedModule
  ],
  exports: [
  ],
  declarations: [
  	SettingApplicationsComponent,
  	SettingApplicationsGridComponent,
  	SettingApplicationsFormComponent
  ],
  providers: [
  	SettingApplicationsService
  ]
})
export class SettingApplicationsModule { }

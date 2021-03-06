import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelRoutingModule } from './main-panel-routing.module';

import { MenubarModule } from '../menubar/menubar.module';
import { PanelMenuModule, PanelModule, DropdownModule } from 'primeng/primeng';
import { MainPanelComponent } from './main-panel.component';
import { SharedModule } from '../common/shared';

@NgModule({
  imports: [
    CommonModule,
    MainPanelRoutingModule,
    PanelMenuModule,
    PanelModule,
    MenubarModule,
    DropdownModule,   
    SharedModule
  ],
  declarations: [
  	MainPanelComponent
  ]
})
export class MainPanelModule { }

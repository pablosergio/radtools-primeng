import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelRoutingModule } from './main-panel-routing.module';

import { MenubarModule } from '../menubar/menubar.module';
import { PanelMenuModule, PanelModule } from 'primeng/primeng';
import { MainPanelComponent } from './main-panel.component';


@NgModule({
  imports: [
    CommonModule,
    MainPanelRoutingModule,
    PanelMenuModule,
    PanelModule,
    MenubarModule,
  ],
  declarations: [
  	MainPanelComponent
  ]
})
export class MainPanelModule { }

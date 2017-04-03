import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelRoutingModule } from './main-panel-routing.module';

import { PanelMenuModule, MenubarModule } from 'primeng/primeng';
import { MainPanelComponent } from './main-panel.component';


@NgModule({
  imports: [
    CommonModule,
    MainPanelRoutingModule,
    PanelMenuModule,
    MenubarModule,
  ],
  declarations: [
  	MainPanelComponent
  ]
})
export class MainPanelModule { }

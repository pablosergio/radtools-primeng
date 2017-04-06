import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { MainPanelComponent } from './main-panel.component';

import { AuthGuardService } from '../common/api';

const mainPanelRoutes: Routes = [
   {
    path: '',
    canActivate: [AuthGuardService],
    /*resolve: {
       settingApplicationsGrid: SettingApplicationsGridResolver
    },*/
    component: MainPanelComponent,
    children: [
      {
        path: 'setting-applications',
        loadChildren: 'app/setting-applications/setting-applications.module#SettingApplicationsModule',
        
      }
    ]
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(mainPanelRoutes)
  ],
  exports: [
    RouterModule
  ],
  /*providers: [
    menuResolver
  ]*/
})
export class MainPanelRoutingModule { }
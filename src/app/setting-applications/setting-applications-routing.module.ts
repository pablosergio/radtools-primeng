import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
//import { SettingApplicationsComponent }   from './setting-applications.component';
//import { SettingApplicationsGridComponent }   from './setting-applications-grid/setting-applications-grid.component';
//import { SettingApplicationsFormComponent }   from './setting-applications-form/setting-applications-form.component';
import { AuthGuardService } from '../common/api';
import { SettingApplicationsResolverService, SettingApplicationDetailResolverService }   from './setting-applications-resolver.service';
import { SettingApplicationsComponent } from './setting-applications.component';
import { SettingApplicationsGridComponent,  SettingApplicationsFormComponent } from './setting-applications.component';

const settingApplicationsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    /*resolve: {
       data: SettingApplicationsResolverService
    },*/
    component: SettingApplicationsComponent,
    children: [
      {
        path: '',
        component: SettingApplicationsGridComponent,
        children: [
          {
            path: ':id',
            component: SettingApplicationsFormComponent,
            resolve: {
               data: SettingApplicationDetailResolverservice
            }
          },
          {
            path: 'new',
            component: SettingApplicationsFormComponent,
            resolve: {
               data: SettingApplicationDetailResolverservice
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingApplicationsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SettingApplicationsResolverService,
    SettingApplicationDetailResolverService
  ]
})
export class SettingApplicationsRoutingModule { }

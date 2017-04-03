import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
//import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'main',
    loadChildren: 'app/main-panel/main-panel.module#MainPanelModule',
    //canActivate: [AuthGuardService]
  },

  /*{
    path: 'setting-applications',
    loadChildren: 'app/setting-applications/setting-applications.module#SettingApplicationsModule',
    canLoad: [AuthGuardService]
  },*/
  { 
  	path: '',   
  	redirectTo: '/main', 
  	pathMatch: 'full',
  	//canActivate: [AuthGuardService],
  },
  /*{ 
  	path: '**', 
  	//component: AppPageNotFoundComponent 
    component: "" 
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingApplications } from './setting-applications';
import { SettingApplicationsService } from './setting-applications.service';
import { LoaderService, PageResponse, DataService, DataTable } from '../common/api';

@Component({
  selector: 'app-setting-applications',
  template: `
  	<p-panel header="Title" [toggleable]="true">
  		<router-outlet></router-outlet>
  	</p-panel>
  `,
  styles: []
})
export class SettingApplicationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'setting-applications-grid',
  template: `
  	<p-dataTable [value]="store" [rows]="8" [lazy]="true" (onLazyLoad)="loadData($event)" [totalRecords]="totalRecords" [paginator]="true">
    	<p-column field="name_application" header="Name"></p-column>
    	<p-column field="path_application" header="Path"></p-column>
    	<p-column field="token_secret" header="Token"></p-column>
    	<p-column field="host" header="Host"></p-column>
    	<p-column field="port" header="Port"></p-column>
    	<p-column field="schema" header="Schema"></p-column>
    	<p-column field="database" header="Database"></p-column>
    	<p-column field="creation_date" header="Creation Date"></p-column>
	</p-dataTable>
  `,
  styles: [],
})

export class SettingApplicationsGridComponent extends DataTable<SettingApplications>{
  //applications: SettingApplications[];	
  constructor(route: ActivatedRoute, router: Router, service: DataService<SettingApplications>, settingApplicationsService: SettingApplicationsService, loaderService: LoaderService) {  
    super(route, router, service, loaderService);
    service.endpoint = "applicationSettings",
    service.communication.update$.subscribe(
      result => {
        this.reload();
      });
  }

  /*ngOnInit() {
    this.route.data
      .subscribe((data: { data: PageResponse<SettingApplications> }) => {
          this.applications = data.data.rows,
          this.totalRecords = data.data.total,
          error =>  this.errorMessage = <any>error
    });
 }*/
  /*onSelect(application: SettingApplications) {
    //this.router.navigate(['/setting-applications', application.application_id]);
    this.selectedId = application.application_id;

    // Navigate with relative link
    this.router.navigate([application.application_id], { relativeTo: this.route });
  }

  isSelected(application: SettingApplications) {
    return application.application_id === this.selectedId;
  }*/

}
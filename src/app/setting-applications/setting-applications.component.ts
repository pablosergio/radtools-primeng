import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingApplications } from './setting-applications';
import { SettingApplicationsService } from './setting-applications.service';
import { LoaderService, PageResponse, DataService, DataTable } from '../common/api';
import { SelectItem } from 'primeng/primeng';


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
  	<div class="ui-widget-header" style="padding:4px 10px;border-bottom: 0 none">
    	<i class="fa fa-search" style="margin:4px 4px 0 0"></i>
    	<input #gb type="text" pInputText size="50" placeholder="Global Filter">
	</div>
  	<p-dataTable [value]="store" [rows]="8" [lazy]="true" (onLazyLoad)="loadData($event)" [totalRecords]="totalRecords" [paginator]="true" [globalFilter]="gb" selectionMode="single" [(selection)]="application" #dt>
    	<p-column field="name_application" header="Name" sortable="true" [filter]="true" filterPlaceholder="Search">></p-column>
    	<p-column field="path_application" header="Path"></p-column>
    	<p-column field="token_secret" header="Token"></p-column>
    	<p-column field="host" header="Host"></p-column>
    	<p-column field="port" header="Port"></p-column>
    	<p-column field="schema" header="Schema"></p-column>
    	<p-column field="database" header="Database" [style]="{'overflow':'visible'}" filterMatchMode="equals">
    		<template pTemplate="filter" let-col>
            	<p-dropdown [options]="databases" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value,col.field,col.filterMatchMode)" styleClass="ui-column-filter"></p-dropdown>
        	</template>
    	</p-column>
    	<p-column field="creation_date" header="Creation Date" [style]="{'text-align':'center'}">
			<template pTemplate="body" let-col let-account="rowData">{{ account.creation_date | date: 'dd/MM/yyyy' }}</template>
			<template pTemplate="filter" let-col>
				<input type="text" pInputText class="ui-column-filter" [value]="dt.filters[col.field] ? dt.filters[col.field].value : ''" (click)="dt.onFilterInputClick($event)" (keyup)="dt.onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
            </template>
    	</p-column>
    	<p-footer><div style="text-align: left">Selected Application: {{application ? application.name_application: 'none'}}</div></p-footer>
    
	</p-dataTable>
  `,
  styles: [],
})

export class SettingApplicationsGridComponent extends DataTable<SettingApplications> implements OnInit{
  //applications: SettingApplications[];
  databases: SelectItem[];
  application: SettingApplications;
  constructor(route: ActivatedRoute, router: Router, service: DataService<SettingApplications>, settingApplicationsService: SettingApplicationsService, loaderService: LoaderService) {  
    super(route, router, service, loaderService);
    service.endpoint = "applicationSettings",
    service.communication.update$.subscribe(
      result => {
        this.reload();
      });
  }

  ngOnInit() {
    /*this.route.data
      .subscribe((data: { data: PageResponse<SettingApplications> }) => {
          this.applications = data.data.rows,
          this.totalRecords = data.data.total,
          error =>  this.errorMessage = <any>error
    });*/
        this.databases = [];
        this.databases.push({label: 'All databases', value: null});
        this.databases.push({label: 'SIDPROD', value: 'SIDPROD'});
        this.databases.push({label: 'SIDPROD_SIPRE', value: 'SIDPROD_SIPRE'});
        this.databases.push({label: 'SPROD', value: 'SPROD'});
      
 }

 selection(record:SettingApplications){
 		console.log(record);
 }
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
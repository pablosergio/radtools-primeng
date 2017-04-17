import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingApplications } from './setting-applications';
import { SettingApplicationsService } from './setting-applications.service';
import { LoaderService, PageResponse, DataService, DataTable, ModalCommunicationService } from '../common/api';
import { SelectItem } from 'primeng/primeng';
import { Subscription }  from 'rxjs/Subscription';

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
        <p-splitButton [style]="{'float':'right'}" label="New" icon="fa-file-o" (onClick)="newRecord()" [model]="items"></p-splitButton>
    </div>
  	<p-dataTable [value]="store" [rows]="8" [lazy]="true" (onLazyLoad)="loadData($event)" [totalRecords]="totalRecords" [paginator]="true" [globalFilter]="gb" selectionMode="single" [(selection)]="application" #dt>
  		<p-column field="name_application" header="Name" sortable="true" [filter]="true" filterPlaceholder="Search"></p-column>
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
	<router-outlet></router-outlet>
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

 newRecord(){
 	this.router.navigate(['new'], { relativeTo: this.route });
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

@Component({
  selector: 'setting-applications-form',
  template: `
  	<!--<p-growl [value]="msgs" sticky="sticky"></p-growl>-->
    <window-dialog [(visible)]="showDialog" [closable]="false" [header]="true" [footer]="true" [title]="title">
	<form>
	   <div class="form-group">
		<label class="center-block">Application Name
			<input [(ngModel)]="application.name_application" [ngModelOptions]="{standalone: true}" class="form-control">
		</label>
		</div> 
		<div class="form-group">
			<label class="center-block">Application Path
				<input  [(ngModel)]="application.path_application"  [ngModelOptions]="{standalone: true}" class="form-control">
			</label>
		</div>
		<div class="form-group">
			<label class="center-block">Token Secret
				<input  [(ngModel)]="application.token_secret" [ngModelOptions]="{standalone: true}"  type="password" class="form-control">
			</label>	
		</div>
		<div class="form-group">
			<label class="center-block">Host
				<input  [(ngModel)]="application.host" [ngModelOptions]="{standalone: true}"  class="form-control">
			</label>
		</div>
		<div class="form-group">
			<label class="center-block">Port
				<input  [(ngModel)]="application.port" [ngModelOptions]="{standalone: true}" class="form-control">
			</label>	
		</div>
		<div class="form-group">
			<label class="center-block">Database
				<input  [(ngModel)]="application.database" [ngModelOptions]="{standalone: true}" class="form-control">
			</label>	
		</div>
		<div class="form-group">
			<label class="center-block">Schema
				<input  [(ngModel)]="application.schema" [ngModelOptions]="{standalone: true}" class="form-control">
			</label>	
		</div>
	</form>
	</window-dialog>
  `,
  styles: [],
})

export class SettingApplicationsFormComponent implements OnInit {
  showDialog = true;
  title: string = 'Setting Applications';
  application: SettingApplications;
  subscriptionUpdate: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private service: SettingApplicationsService, private modalCommunication: ModalCommunicationService){ 
    this.subscriptionUpdate = service.communication.update$.subscribe(
      application => {
        this.application = application;
    });

    this.modalCommunication.btnCancel$.subscribe(
      result => {
        this.cancel();
    });

    this.modalCommunication.btnSave$.subscribe(
      result => {
        //this.save();
    });
  }

  ngOnInit() {
  	this.route.data
      .subscribe((data: { data: SettingApplications }) => {
          this.application = data.data
    });
  }   

  cancel() {
    this.gotoSettingApplications();
  }

  gotoSettingApplications() {
   // Relative navigation back to the Setting Applications
    let applicationId = this.application ? this.application.application_id: null;
    this.router.navigate(['../'], { relativeTo: this.route });
    this.service.communication.update(this.application);
  }

}
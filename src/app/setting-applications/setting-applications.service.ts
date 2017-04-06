/* https://angular.io/docs/ts/latest/cookbook/component-communication.html */
import { Injectable } from '@angular/core';
import { DataService } from '../common/api';
import { SettingApplications } from './setting-applications';

@Injectable()
export class SettingApplicationsService  extends DataService<SettingApplications> {
  	endpoint:string = "applicationSettings";
  	guardar(record: SettingApplications){
   		if(record.application_id !== null)
     		return this.update(record);
   		else
      		return this.save(record);
 	}
}

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SettingApplications } from './setting-applications';
import { SettingApplicationsService } from './setting-applications.service';
import { Observable } from 'rxjs/Observable';
import { PageResponse} from '../common/api';

@Injectable()
export class SettingApplicationsResolverService implements Resolve<PageResponse<SettingApplications>> {
  constructor(private service: SettingApplicationsService/*, private router: Router/*, private loaderService: LoaderService*/) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageResponse<SettingApplications>> {
    return this.service.getAll({start: 0, limit: 8});
  }
}
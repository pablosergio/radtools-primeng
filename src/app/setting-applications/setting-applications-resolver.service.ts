import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SettingApplications } from './setting-applications';
import { SettingApplicationsService } from './setting-applications.service';
import { Observable } from 'rxjs/Observable';
import { PageResponse, LoaderService} from '../common/api';

@Injectable()
export class SettingApplicationsResolverService implements Resolve<PageResponse<SettingApplications>> {
  constructor(private service: SettingApplicationsService/*, private router: Router/*, private loaderService: LoaderService*/) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageResponse<SettingApplications>> {
    return this.service.getAll({start: 0, limit: 8});
  }
}

@Injectable()
export class SettingApplicationsDetailsResolverService implements Resolve<SettingApplications> {
  constructor(private service: SettingApplicationsService, private loaderService: LoaderService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SettingApplications> {
    let id = route.params['id'];
    if(id === 'new'){
      return Observable.of(new SettingApplications());
    }
    return this.service.getOne(+id);
  }
}
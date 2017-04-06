import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AppConfig } from '../config/app.config';
import { JwtHelper } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export interface PageResponse<T> {
    total: number;
	rows: T[];
	success: boolean;
}

@Injectable()
export class LoggerService {
  logs: string[] = [];
  constructor() { }
  log(message: string){
  	this.logs.push(message);
  	console.log(message);
  }
}

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http, private config: AppConfig){ }

  
  login(username: string, password: string) : Observable<any> {
    return this.http.post(this.config.getEndpoint('login', null), { username: username, password: password })
    	.map(this.extractData)
    	.catch(this.handleError);
  }

  
  logout(): void {
    this.isLoggedIn = false;
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    //this.logger.log(errMsg);
    return Observable.throw(errMsg);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private config: AppConfig) {}

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
   let token: string = localStorage.getItem('token');
   if(token){
   		 if(!this.jwtHelper.isTokenExpired(token)){
   		 	return true;
   		 }
   }
    
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    //this.router.navigate([{ outlets: { popup: ['compose'] } }], { relativeTo: this.route });
    return false;
  }
}

@Injectable()
export class ModalCommunicationService {

  constructor() { }
  private cancelModal = new Subject();
  private saveModal = new Subject();
  
  // Observable string streams
  btnCancel$ = this.cancelModal.asObservable();
  btnSave$ = this.saveModal.asObservable();
  
  // Service message commands
  btnCancel() {
    this.cancelModal.next();
  }
  btnSave() {
    this.saveModal.next();
  }  
}

@Injectable()
export class CommunicationService<T> {

  constructor() { }

  private openedSource = new Subject<T>();
  private updateSource = new Subject<T>();
  private deleteSource = new Subject<T>();
  private createSource = new Subject<T>();
  private reloadSource = new Subject<any>();
  
  // Observable string streams
  opened$ = this.openedSource.asObservable();
  update$ = this.updateSource.asObservable();
  delete$ = this.deleteSource.asObservable();
  create$ = this.createSource.asObservable();
  reload$ = this.reloadSource.asObservable();

  // Service message commands
  opened(record: T) {
    this.openedSource.next(record);
  }
  update(record: T) {
    this.updateSource.next(record);
  }
  delete(record: T) {
    this.deleteSource.next(record);
  }
  create(record: T) {
    this.createSource.next(record);
  }
  reload(params: any) {
    this.reloadSource.next(params);
  }

}

@Injectable()
export class DataService<T> {
  endpoint:string;
  constructor(private logger: LoggerService, private http: Http, private config: AppConfig, public communication: CommunicationService<T>) { }

  getAll(param): Observable<PageResponse<T>>{
    let params: URLSearchParams = this.objToSearchParams(param);
    
    return this.http.get(this.config.getEndpoint(this.endpoint, null), { search: params })
  					.map(this.extractData)
  					.catch(this.handleError);
  }

  getOne(id: number | string): Observable<T> {
    return this.http.get(this.config.getEndpoint(this.endpoint, null) + '/' +id)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  save(record: T): Observable<T> {
    return this.http.post(this.config.getEndpoint(this.endpoint, null), record)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  update(record: T): Observable<T> {
    return this.http.put(this.config.getEndpoint(this.endpoint, null), record)
            .map(this.extractOneData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private extractOneData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    this.logger.log(errMsg);
    return Observable.throw(errMsg);
  }

  private objToSearchParams(obj): URLSearchParams{
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', '10');
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            params.set(key, obj[key]);
    }
    return params;
 }
}

export class DataTable<T> {
  errorMessage: string;
  store: T[];
  protected selectedId: number;
  totalRecords: number;
  itemsPerPage: number = 10;
  currentPage: number;
  constructor(protected route: ActivatedRoute, protected router: Router, protected service: DataService<T>, protected loaderService: LoaderService) {  }

  /*ngOnInit() {
    this.currentPage = 1;
    this.route.data
      .subscribe((data: { data: PageResponse<T> }) => {
          this.store = data.data.rows,
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

  
  public pageChanged(page:number):number {
   //this method will trigger every page click  

   this.service.getAll({ start: ((page-1) * this.itemsPerPage) , limit: this.itemsPerPage })
    .subscribe(
         result => {
         	this.store = result.rows, 
         	this.currentPage = page;
        },
        error => this.errorMessage = <any>error
      )
    return page;
  };

  public reload(): number{
    this.loaderService.displayLoader(true);
    this.service.getAll({ start: ((this.currentPage-1) * this.itemsPerPage) , limit: this.itemsPerPage})
    .subscribe(
        result => {
          this.store = result.rows,
          this.loaderService.displayLoader(false)
        }, 
        error => this.errorMessage = <any>error
      )
    return this.currentPage;
  }

  public loadData(event){
  	this.loaderService.displayLoader(true);
    this.service.getAll({ start: event.first , limit: event.rows })
    .subscribe(
         result => { 
         	this.store = result.rows,
         	this.totalRecords = result.total,
            this.loaderService.displayLoader(false)
         }, 
         error => this.errorMessage = <any>error
      )
  }

}

export function toBoolean(value) {
    switch (value) {
        case '':
            return true;
        case 'false':
        case '0':
            return false;
        default:
            return !!value;
    }
}

Injectable()
export class LoaderService {
    public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    displayLoader(value: boolean) {
        this.loaderStatus.next(value);
    }
}

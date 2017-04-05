import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {EventEmitter,Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AppConfig } from '../config/app.config';
import { JwtHelper } from 'angular2-jwt';
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

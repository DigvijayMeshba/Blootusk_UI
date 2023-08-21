import { Injectable, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './core/services/env-url';
import { TokenStorageService } from './core/services/token-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  public url = environment.url + '/assets/data/';
  private headers: HttpHeaders;

  constructor(
    public http: HttpClient,
    private token: TokenStorageService,
    private _envUrl: EnvironmentUrlService,
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', 'Bearer ' + window.sessionStorage.getItem('auth-token'));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public GetAll = (route: string):Observable<any> => {
    return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress), { headers: this.headers });
  }

  public GetAllBusinessCatagory = (route: string) => {
    return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress), { headers: this.headers });
  }


    // Add New Record
    public GetAllList = (route: string, body: any) => {
      return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { headers: this.headers });
    }
 

  // Delete Record 
  public Delete = (route: string, body: any) => {
    return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress),{ headers: this.headers });
  }

  // Add New Record
  public Add = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { headers: this.headers });
  }

  // getById
  public getById = (path: any, Id: any) => {
    return this.http.get<any>(this.createCompleteRoute(path + Id, this._envUrl.urlAddress),{ headers: this.headers });
  }


  public edit = (route: string, body: any) => {
    return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { headers: this.headers });
  }

  public uploadDocument = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { headers: this.headers });
  }

}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  backendurl: any;
  constructor(private http: HttpClient) {
    this.backendurl = environment.backendurl;
  }
  addUser(body: any): Observable<any> {
    return this.http.post(`${this.backendurl}/api/v1/user/add`, body
    )
  }
  updateUser(quickdata, id, logs, status, otp, homeinfo): Observable<any> {
    return this.http.post(`${this.backendurl}/api/v1/user/update`, { quickdata, id, logs, status, otp, homeinfo }
    )
  }
  checkRedirect(id): Observable<any> {
    return this.http.post(`${this.backendurl}/api/v1/user/checkRedirect`, { id }
    )
  }
  updateRedirect(id, redirect): Observable<any> {
    return this.http.post(`${this.backendurl}/api/v1/user/updateRedirect`, { id, redirect }
    )
  }
  getuser(id): Observable<any> {
    return this.http.post(`${this.backendurl}/api/v1/user/getuser`, { id }
    )
  }
  setSession(id) {
    return sessionStorage.setItem('id', id);

  }
  getCountries(): Observable<any> {
    return this.http.get(`${this.backendurl}/api/v1/admin/countries/all`,
    )
  }
  getBlocked(): Observable<any> {
    return this.http.get(`${this.backendurl}/api/v1/admin/getBlocks/all`,
    )
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { Config } from '../config';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(protected http: HttpClient) { }
  get<T>(url, roles?): Observable<any> {
    let options = {};
    if (roles) {
      options = {
        params: new HttpParams()
          .set('roles', roles.join(', '))
      };
      return this.http.get(url, options);
    } else {
      return this.http.get(url);
    }
  }
  getSingle<T>(url): Observable<T> {
    return this.http.get<T>(
      `${url}`
    );
  }
  post(url, payload): Observable<any> {
    return this.http.post(url, payload);
  }
  put<T>(url, payload: T): Observable<T> {
    return this.http.put<T>(url, payload);
  }
  delete<T>(url): Observable<T> {
    return this.http.delete<T>(url);
  }
}

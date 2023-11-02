import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_URL } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = SERVER_URL;
  constructor(private http:HttpClient) { }

  get(endpoint: string, params?: any, headers?: any) {
    let reqOpts:any = {
      params: new HttpParams()
    };

    if(headers)
    {
      reqOpts.headers = headers;
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]); 
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, headers?: any) {
    let reqOpts:any = {};
    if(headers)
    {
      reqOpts.headers = headers;
    }
    
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  

  constructor(
    private _http: HttpClient
  ) { }

  get(url, external?): any {
    return this._http.get(url, this.httpOptions);
  }

  post(url, data): any {
    return this._http.post(url, data, this.httpOptions);
  }

  put(url, data): any {
    return this._http.put(url, data, this.httpOptions)
  }

  delete(url): any {
    return this._http.delete(url, this.httpOptions);
  }

  get httpOptions() {
    return {
      headers: new HttpHeaders({})
    }
  }
}
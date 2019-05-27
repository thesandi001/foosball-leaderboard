import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpService
  ) { }

  getAll() {
    const url = 'https://api.sheety.co/ec5c2e5c-817c-491f-95b5-7a35c00685c3';
    return this._http.get(url);
  }
  
}
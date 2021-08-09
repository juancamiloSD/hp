import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError, concatAll, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  getHouse(nombreCasa:string): Observable<any>{ 
    return this._http.get(`${this.url}/house/${nombreCasa}/`, {})
  }
  getStaff(): Observable<any>{
    return this._http.get(`${this.url}/staff/`, {})
  }
  getStudents(): Observable<any>{
    return this._http.get(`${this.url}/students/`, {})
  }
}


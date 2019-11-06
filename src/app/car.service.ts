import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as nodemailer from 'nodemailer';

import {Car} from './car';


@Injectable({
  providedIn: 'root'
})
export class CarService 
{
  baseurl = 'http://localhost/api';
  cars : Car[];

  constructor(private http : HttpClient) { }
  
  private handleError(error : HttpErrorResponse)
  {
    console.log(error);
    return throwError('Error!');
  }

  getAll(): Observable<Car[]>{
     return this.http.get(`${this.baseurl}/list`).pipe(
       map((res) => {
         this.cars = res['data'];
         return this.cars;
        }),catchError(this.handleError)); 
  }
}

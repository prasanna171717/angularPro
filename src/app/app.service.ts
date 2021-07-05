import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { ItemData } from './inventory/inventory.component';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  data: object = {}


  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000/inventory"





  getItems(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(catchError(this.errorMgmt))
  }
  getItembyId(id: number) {
    return this.http.get<any>(this.baseUrl + '/' + id).pipe(catchError(this.errorMgmt))
  }

  deleteItem(id: number) {
    return this.http.delete<any>(this.baseUrl + '/' + id).pipe(catchError(this.errorMgmt))
  }

  addItem(item: ItemData) {
    return this.http.post<any>(this.baseUrl, item).pipe(catchError(this.errorMgmt))
  }


  id: number = 0

  setId(id: number) {
    this.id = id
  }
  getId() {
    return this.id
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  editItem(item: ItemData) {
    return this.http.put<any>(this.baseUrl + '/' + item.id, item)
  }
}

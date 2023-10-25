import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
  private apiUrl = 'http://localhost:5000/api/v1/data/getincidents';
  constructor(private http: HttpClient) { }

  getincidents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}

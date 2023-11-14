import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
  private apiUrl = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) { }

  getincidents(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "data/getincidents");
  }

  getUserAction(userName: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "charts/getuseractions", userName);
  }


  getallusers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "charts/getallusers");
  }

  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "charts/getallcourses");
  }

  getAllAnswersCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "charts/getallanswersbycourse", course);
  }

  getAllDatesCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "charts/getalldatesbycourse", course);
  }

}

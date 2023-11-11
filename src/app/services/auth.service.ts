import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private header = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) { }
  private url = "http://localhost:5000/api/v1/auth/login";
  login(logindata: any) {
    return this.http.post(this.url, logindata, { headers: this.header, withCredentials: true });
  }

  refreshToken(){
    return this.http
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:5000/api/v1/auth/login";
  login(logindata: any) {
    return this.http.post(this.url, logindata);
  }

}

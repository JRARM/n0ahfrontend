import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private header = new HttpHeaders().set('Content-Type', 'application/json')
  userdata: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
  private url = "http://localhost:5000/api/v1/auth/";
  login(logindata: any) {
    return this.http.post(this.url + "login", logindata, { headers: this.header, withCredentials: true });
  }

  register(registerdata: any) {
    return this.http.post(this.url + "register", registerdata);
  }

  getuserInfo(bearer: string) {
    const headersWithBearer = this.header.set('Authorization', `Bearer ${bearer}`);
    return this.http.get(this.url + "protected", { headers: headersWithBearer, withCredentials: true });
  }

  private isAuthenticatedSubject = new BehaviorSubject<any>({
    email: "",
    uid: "",
    role: false
  });

  logins(responseinfo: any) {
    // Lógica de inicio de sesión, por ejemplo, verificar credenciales.
    this.isAuthenticatedSubject.next(responseinfo);
  }

  logout() {
    this.isAuthenticatedSubject.next({
      email: "",
      uid: "",
      role: false
    });
  }

  isAuthenticatedUser() {
    return this.isAuthenticatedSubject.asObservable();
  }




  // setUserInfoLocal(userinfo: any): boolean {
  //   let userinfolocal = localStorage.getItem('userInfo');
  //   if (userinfolocal) {
  //     this.isAuthenticated = true;
  //     return false;
  //   } else {
  //     localStorage.setItem('userInfo', JSON.stringify(userinfo));
  //     return true;
  //   }

  // }

  //  isAuthenticatedUser() {
  //   return this.isAuthenticated;
  // }




}

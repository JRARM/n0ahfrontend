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
    this.setUserInfoLocal(responseinfo);
    this.isAuthenticatedSubject.next(responseinfo);
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.isAuthenticatedSubject.next({
      email: "",
      uid: "",
      role: false
    });
  }

  isAuthenticatedUser() {
    let userinfolocal = localStorage.getItem('userInfo');
    if (userinfolocal) {
      this.isAuthenticatedSubject.next(JSON.parse(userinfolocal));
      console.log(userinfolocal);
    }
    return this.isAuthenticatedSubject.asObservable();
  }




  setUserInfoLocal(userinfo: any) {
    let userinfolocal = localStorage.getItem('userInfo');
    if (userinfolocal) {
      this.isAuthenticatedSubject.next(JSON.parse(userinfolocal));
    } else {
      localStorage.setItem('userInfo', JSON.stringify(userinfo));
      console.log("guardando localuserifno")
    }

  }

  //  isAuthenticatedUser() {
  //   return this.isAuthenticated;
  // }




}

import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("carga elemento");
  }

  onSubmit() {
    console.log("estoy enviando", this.userLogin.email, this.userLogin.password);
    try {
      this.authService.login(this.userLogin).subscribe(response => {
        console.log(response);
        this.router.navigate(['/graficas'])
      })
    } catch (error) {
      console.log(error);
    }
  }

}

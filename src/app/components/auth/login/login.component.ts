import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    //console.log("carga elemento");
  }

  onSubmit() {
    //console.log("estoy enviando", this.userLogin.email, this.userLogin.password);
    try {
      this.authService.login(this.userLogin).subscribe((response: any) => {
        //console.log(response);
        this.authService.getuserInfo(response.token).subscribe((responseinfo: any) => {
          this.authService.logins(responseinfo);
        });
        this.router.navigate(['/graficas'])
        Swal.fire('Inicio de sesion', 'Inicio de sesion correcto', 'success');
      })
    } catch (error) {
      console.log(error);
    }
  }

}

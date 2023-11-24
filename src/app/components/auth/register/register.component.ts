import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerdata = {
    name: "",
    email: "",
    role: false,
    password: ""
  }
  public confirmpassword: String = "";

  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    if (this.registerdata.password == this.confirmpassword) {
      console.log("correcto contraseñas iguales", this.registerdata, this.confirmpassword);
      this.authService.register(this.registerdata).subscribe(data => {
        console.log("docente registrado correctamente", data)
      })

    } else {
      console.log("las contraseñas no coinciden", this.confirmpassword, this.registerdata.password);
    }
  }


}

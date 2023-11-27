import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
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

  }
  onSubmit() {
    if (this.registerdata.password == this.confirmpassword) {
      console.log("correcto contraseñas iguales", this.registerdata, this.confirmpassword);
      this.authService.register(this.registerdata).subscribe(data => {
        this.alertConfirmation();
        console.log("docente registrado correctamente", data)
      },
        error => {
          console.error("Error al registrar docente", error);
          if (error.error) {
            Swal.fire('Error', error.error.error, 'error');
          }
          if (error.error.errors[0].msg) {
            Swal.fire('Error', error.error.errors[0].msg, 'error');
          }
        })

    } else {
      console.log("las contraseñas no coinciden", this.confirmpassword, this.registerdata.password);
      Swal.fire('Contraseñas', 'Las constraseñas no coinciden', 'error');
    }
  }

  alertConfirmation() {
    Swal.fire('Registro', 'El docente se registro Correctamente.', 'success').then((result) => {
      if (result.value) {

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }

}

import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgottenpassword',
  templateUrl: './forgottenpassword.component.html',
  styleUrls: ['./forgottenpassword.component.css']
})
export class ForgottenpasswordComponent {
  email: string = "";
  onforgottenpassword() {
    if (this.email != "") {
      Swal.fire('Recuperacion', 'Se envio un correo para restablecer la cotraseña', 'success');
    } else {
      Swal.fire('Recuperacion', 'Ingresa un correo', 'error');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isloged: boolean = false;
  public islogedAdministrator: boolean = false;
  constructor(private authservice: AuthService) {

  }



  ngOnInit(): void {
    this.authservice.isAuthenticatedUser().subscribe((authStatus) => {
      console.log("en el navbar comprobacion de datos", authStatus);
      if (authStatus.role) {
        console.log("entrando a administrador");
        this.islogedAdministrator = true;
        this.isloged = true;
      } else {

        if (authStatus.uid !== "") {
          console.log("entrando a docente");
          this.isloged = true;
        }
      }
    })
  }

  logout() {
    console.log("cerrando sesion");
    this.authservice.logout();
    Swal.fire('Cierre de sesion', 'El cierre de sesion se realizo Correctamente.', 'success')
  }





}

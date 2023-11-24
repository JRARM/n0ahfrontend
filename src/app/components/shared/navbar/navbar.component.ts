import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
      console.log(authStatus);
      if (authStatus.role) {
        this.islogedAdministrator = true;
        this.isloged = true;
      } else {
        if (authStatus.uid != "") {
          this.isloged = true;
        }
      }
    })
  }

  logout() {
    console.log("cerrando sesion");
    this.authservice.logout();
  }





}

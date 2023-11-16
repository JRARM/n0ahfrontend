import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isloged = true;
  constructor(private authservice: AuthService) {

  }
  ngOnInit(): void {
    console.log("navbar loaded");

  }



}

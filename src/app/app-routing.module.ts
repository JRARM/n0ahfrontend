import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GraphicsComponent } from './components/main/graphics/graphics.component';
import { ForgottenpasswordComponent } from './components/auth/forgottenpassword/forgottenpassword.component';

const routes: Routes = [
  { path: '', title: 'N0ah', component: HomeComponent },
  { path: 'iniciarsesion', title: 'N0ah - Inicio de Sesion', component: LoginComponent },
  { path: 'registrarse', title: 'N0ah - Registro', component: RegisterComponent },
  { path: 'olvidecontrasena', title: 'N0ah - Olvide Contraseña', component: ForgottenpasswordComponent },

  { path: 'graficas', title: 'N0ah - Graficas', component: GraphicsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

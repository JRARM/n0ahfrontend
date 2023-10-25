import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GraphicsComponent } from './components/main/graphics/graphics.component';
import { ForgottenpasswordComponent } from './components/auth/forgottenpassword/forgottenpassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'iniciarsesion', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'olvidecontrasena', component: ForgottenpasswordComponent },

  { path: 'graficas', component: GraphicsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { EditItemComponent } from './edit-or-create-item/edit-or-create-item.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate:[AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "forget-password", component: ForgetPasswordComponent},
  {path: "home", component: HomeComponent, canActivate:[AuthGuard]},
  {path: "editItem/:id", component: EditItemComponent},
  {path: "admin", component: AdminComponent, canActivate:[RoleGuard]},
  {path: "report", component: ReportComponent, canActivate:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

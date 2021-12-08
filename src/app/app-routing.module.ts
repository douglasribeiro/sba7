import { Page404Component } from './shared/components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterConfirmationComponent } from './components/register-user/register-confirmation.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChechIdUserTokenComponent } from './components/change-password/check-iduser-token.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './components/resend-registration-token/resend-registration-token.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path : '', component : HomeComponent},
   { path: 'login', component: LoginUserComponent },
   { path: 'register-user', component: RegisterUserComponent },
   { path: 'register-confirmation', component: RegisterConfirmationComponent },
   { path: 'resend-register-token', component: ResendRegistrationTokenComponent },
   { path: 'reset-password', component: ResetPasswordComponent },
   { path: 'change-password', component: ChechIdUserTokenComponent },
   { path: 'save-password/:id', component: ChangePasswordComponent },
   { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
   { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
   { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
   { path: '**', component: Page404Component }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

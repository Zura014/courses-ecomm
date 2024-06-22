import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [authGuard],
      },
      { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [authGuard] },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [authGuard]
      },
    ]),
  ],
})
export class AuthModule {}

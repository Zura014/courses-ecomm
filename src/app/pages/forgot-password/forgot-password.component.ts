import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);

  forgotPasswordForm: FormGroup;


  constructor() {

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
        Validators.maxLength(32),
      ])});
  }

  forgotPassword() {
    if(this.forgotPasswordForm){
      const user = this.forgotPasswordForm.value;
      
      this.authService
      .forgotPassword(user)
      .subscribe( res => {
        this.router.navigateByUrl('/login')
      });
    }
  }


}

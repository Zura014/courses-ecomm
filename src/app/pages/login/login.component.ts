import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { matchPassword } from '../../validators/passwordMatch.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);

  registerForm: FormGroup;


  constructor() {

    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
        Validators.maxLength(32),
      ]),
      repeatPassword: new FormControl(''),
      agreement: new FormControl(false, Validators.requiredTrue),
    },
      {
        validators: matchPassword
      }
    );
  }

  signUp() {
    console.log('zdbanda')
  }


}

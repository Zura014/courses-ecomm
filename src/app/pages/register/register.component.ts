import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { passwordMatchValidator } from '../../validators/passwordMatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);

  registerForm: FormGroup = new FormGroup({
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
  });

  // constructor(private formBuilder: FormBuilder) {
  //   this.registerForm = this.formBuilder.group({
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     repeatPassword: ['', Validators.required]
  //   }, { validator: passwordMatchValidator });
  // }

  signUp(): void {
    console.log('zd bandaaaaa')
  }

}

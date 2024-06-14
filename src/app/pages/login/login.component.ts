import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { matchPassword } from '../../validators/passwordMatch.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);

  loginForm: FormGroup;
  isLoggedIn!: boolean;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
        Validators.maxLength(32),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signIn() {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService
      .signIn(user)
      .subscribe({
        next: (resData) => {
          localStorage.setItem('accessToken', resData.accessToken);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.loginForm.controls['password'].reset();    
        },
        complete: () => {

        }
      }
    )
    }
  }
}

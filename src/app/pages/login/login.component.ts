import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { matchPassword } from '../../validators/passwordMatch.validator';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);
  isLoading: boolean = false;
  loginForm: FormGroup;
  isLoggedIn!: boolean;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;


  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
        Validators.maxLength(32),
      ]),
      rememberMe: new FormControl(true || false, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  signIn() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      const rememberMe: boolean = this.loginForm.value.rememberMe
      this.authService
      .signIn(user)
      .subscribe(
        {
          next: (resData) => {
            localStorage.setItem('accessToken', resData.accessToken);
            localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
            this.isLoading = false;
          },
          error: (err) => {
            this.loginForm.controls['password'].reset();
            this.showErrorAlert(err.error.message);
            this.isLoading = false;
          },
          complete: () => {
            this.router.navigateByUrl('/');
          }
        }
      )
    }
  }
  private showErrorAlert(message: string): void {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
  
    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}

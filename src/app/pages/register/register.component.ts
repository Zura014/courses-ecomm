import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { matchPassword } from '../../validators/passwordMatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  banner: string = '../../../assets/page-title.jpg';
  router = inject(Router);
  authService = inject(AuthService);
  @ViewChild('adminOption', {static: false}) adminOption!: ElementRef;
  @ViewChild('userOption', {static: false}) userOption!: ElementRef;
  registerForm: FormGroup;
  roleSelected!: boolean;


  isSelected(): boolean {
    if(this.adminOption.nativeElement.selected || this.userOption.nativeElement.selected) {
      console.log(this.roleSelected);
      return this.roleSelected = true;
      } 
      else {
        console.log(this.roleSelected);
        return this.roleSelected = false;
    }
  }
   

  constructor() {
    this.registerForm = new FormGroup(
      {
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
        role: new FormControl(Number, Validators.required)
      },
      {
        validators: matchPassword,
      }
    );
  }

  signUp() {
    if (this.registerForm.valid) {
      const user = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role,
      };
      try {
      this.authService
      .signUp(user)
      .subscribe(user => this.authService.signUp(user));
      this.registerForm.reset();
      this.router.navigateByUrl('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
}

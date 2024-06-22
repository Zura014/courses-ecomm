import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../validators/password.validator';
import { matchPassword } from '../../../validators/passwordMatch.validator';
import { PlaceholderDirective } from '../../../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  banner: string = '../../../assets/page-title.jpg';
  isLoading: boolean = false;
  router = inject(Router);
  authService = inject(AuthService);
  @ViewChild('adminOption', { static: false }) adminOption!: ElementRef;
  @ViewChild('userOption', { static: false }) userOption!: ElementRef;
  registerForm: FormGroup;
  roleSelected!: boolean;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;

  isSelected(): boolean {
    if (
      this.adminOption.nativeElement.selected ||
      this.userOption.nativeElement.selected
    ) {
      return (this.roleSelected = true);
    } else {
      return (this.roleSelected = false);
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
        role: new FormControl(Number, Validators.required),
      },
      {
        validators: matchPassword,
      },
    );
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  signUp() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const user = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role,
      };
      this.authService
        .signUp(user)
        // .subscribe(user => this.authService.signUp(user));
        .subscribe({
          next: (resData) => {
            this.registerForm.reset();
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err.error.message);
            this.showErrorAlert(err.error.message);
            this.isLoading = false;
          },
          complete: () => {
            this.router.navigateByUrl('/login');
          },
        });
      // this.router.navigateByUrl('/login');
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

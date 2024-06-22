import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  take,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

interface UserI {
  username?: string;
  email: string;
  password: string;
  role?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _signUpUrL = 'http://localhost:3000/auth/signup';
  private _signInUrL = 'http://localhost:3000/auth/signin';
  private _forgotPassUrl = 'http://localhost:3000/auth/forgot-password';
  private _profileUrl = 'http://localhost:3000/users/profile';
  private accessToken: string = '';
  private readonly LAST_ACTIVE_TIME_KEY = 'lastActiveTime';
  private readonly AUTO_LOGOUT_TIME = Math.floor(3600 * 1000); //! time in seconds multiplied by 1000 miliseconds

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  signUp(user: UserI): Observable<UserI> {
    return this.http.post<UserI>(this._signUpUrL, user).pipe(
      tap((resData) => {
        if (resData) {
          this.handleAuth(user);
        }
      }),
      catchError(this.handleError),
    );
  }

  signIn(user: UserI): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(this._signInUrL, user).pipe(
      catchError(this.handleError),
      tap((resData) => {
        localStorage.setItem('accessToken', resData.accessToken);
        this.accessToken = resData.accessToken;
      }),
    );
  }

  setLastActiveTime(): void {
    const currentTime = Date.now();
    localStorage.setItem(this.LAST_ACTIVE_TIME_KEY, currentTime.toString());
  }

  autoLogOut() {
    if (this.isRememberMeEnabled()) {
      return; // Skip auto-logout if "Remember Me" is enabled
    }

    const lastActiveTime = localStorage.getItem(this.LAST_ACTIVE_TIME_KEY);
    const token = localStorage.getItem('accessToken');

    if (!lastActiveTime || !token) {
      return;
    }

    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(lastActiveTime, 10);

    if (timeElapsed > this.AUTO_LOGOUT_TIME) {
      this.logOut();
    }
  }

  forgotPassword(user: any): Observable<any> {
    return this.http.post(this._forgotPassUrl, user);
  }

  isLoggedIn(): boolean {
    try {
      if (localStorage.getItem('accessToken')) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  logOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    localStorage.removeItem('rememberMe');
  }

  isRememberMeEnabled(): boolean {
    return localStorage.getItem('rememberMe') === 'true';
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    // switch (errorRes.error.error.message) {
    //   case 'The entered data is incorrect. Please review and make sure all fields are entered correctly.':
    //     errorMessage = 'This email exists already';
    //     break;
    // }
    return throwError(errorRes);
  }
  private handleAuth(user: UserI) {
    if (this.accessToken) {
      return;
    } else {
      this.signIn({
        email: user.email,
        password: user.password,
      }).subscribe({
        next: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.handleError(err);
        },
      });
    }
  }
}

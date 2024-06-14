import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../shared/user.model';
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

  constructor(private http: HttpClient, private router: Router) {
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  signUp(user: UserI): Observable<UserI> {
    return this.http.post<UserI>(this._signUpUrL, user).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(resData);
        console.log(resData);
      })
    );
  }
  
  signIn(user: UserI): Observable<{ accessToken: string }> {
    return this.http
    .post<{ accessToken: string }>(this._signInUrL, user)
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        localStorage.setItem('accessToken', resData.accessToken);
        this.accessToken = resData.accessToken;
      })
    );
  }
  
  forgotPassword(user: any): Observable<any> {
    return this.http.post(this._forgotPassUrl, user);
  }
  
  isLoggedIn(): boolean {
    try {
      if(localStorage.getItem('accessToken')){
        return true;
      } else {
        return false;
      }
    } 
    catch (error){
      return false;
    }
  }

  logOut(): void {
    localStorage.clear();
    window.location.reload();
  }

  private handleError(errorRes: HttpErrorResponse) {

    console.log(errorRes.message)
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Email already exists':
        errorMessage = 'This email exists already';
        break;
    }
    return throwError(errorRes);
  }
  private handleAuth(resData: UserI) {
    if(resData === null) {
      return resData;
    } else {
      this.signIn({
          email: resData.email,
          password: resData.password
        })
        .subscribe(
          {
            next: (response) => {
            localStorage.setItem('accessToken', response.accessToken);
            this.router.navigateByUrl('/');
          }, error: (err) => {
            this.handleError(err);
          }
        }
      )
    }
  }
}

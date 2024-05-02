import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _signUpUrL = 'http://localhost:3000/auth/signup';
  private _signInUrL = 'http://localhost:3000/auth/signin';
  private _forgotPassUrl = 'http://localhost:3000/auth/forgot-password';
  private _profileUrl = 'http://localhost:3000/users/profile';
  private accessToken: string = '';

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  signUp(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this._signUpUrL, user);
  }
  
  signIn(user: any): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>('http://localhost:3000/auth/forgot-password', user);
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
}
